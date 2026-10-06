from __future__ import annotations

import json
import mimetypes
import uuid
from datetime import datetime
from typing import Any

import gspread
from google.oauth2.service_account import Credentials
from google.oauth2.credentials import Credentials as UserCredentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaInMemoryUpload


REPORT_HEADERS = [
    "report_id", "created_at", "region", "reporter", "category", "severity", "summary", "original_text",
    "english_text", "detected_language", "bus_id", "route", "review_status", "owner", "due_date", "status",
    "attachment_url", "audio_url", "ai_mode",
]
ACTION_HEADERS = [
    "action_id", "report_id", "created_at", "region", "bus_id", "category", "severity", "summary", "owner",
    "due_date", "status", "escalation", "resolution_notes", "attachment_url", "audio_url",
]
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
]


class GoogleWorkspace:
    def __init__(self, service_account_json: str, spreadsheet_id: str, drive_credentials_json: str = ""):
        info = json.loads(service_account_json)
        credentials = Credentials.from_service_account_info(info, scopes=SCOPES)
        self.sheets = gspread.authorize(credentials).open_by_key(spreadsheet_id)
        self.drive = None
        self.folder_id = ""
        self.drive_error = ""
        if drive_credentials_json:
            try:
                drive_credentials = UserCredentials.from_authorized_user_info(json.loads(drive_credentials_json))
                self.drive = build("drive", "v3", credentials=drive_credentials, cache_discovery=False)
                self.folder_id = self._ensure_evidence_folder()
            except Exception as exc:
                self.drive = None
                self.folder_id = ""
                self.drive_error = str(exc)
        self.reports = self._worksheet("Reports", REPORT_HEADERS)
        self.actions = self._worksheet("Actions", ACTION_HEADERS)
        self.daily_briefs = self._worksheet("Daily Briefs", ["brief_date", "generated_at", "summary", "open_actions", "overdue_actions", "critical_actions"])
        self.connected = True

    @property
    def drive_connected(self) -> bool:
        return self.drive is not None and bool(self.folder_id)

    def _ensure_evidence_folder(self) -> str:
        results = self.drive.files().list(
            q="name = 'FleetDesk Evidence' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
            spaces="drive", fields="files(id,name)", pageSize=10,
        ).execute()
        folders = results.get("files", [])
        if folders:
            return folders[0]["id"]
        folder = self.drive.files().create(
            body={"name": "FleetDesk Evidence", "mimeType": "application/vnd.google-apps.folder"},
            fields="id",
        ).execute()
        return folder["id"]

    def _worksheet(self, title: str, headers: list[str]):
        try:
            ws = self.sheets.worksheet(title)
        except gspread.WorksheetNotFound:
            ws = self.sheets.add_worksheet(title=title, rows=1000, cols=len(headers))
        if not ws.row_values(1):
            ws.append_row(headers)
        return ws

    def list_rows(self, kind: str) -> list[dict[str, Any]]:
        ws = self.reports if kind == "reports" else self.actions
        return ws.get_all_records()

    def append_report(self, report: dict[str, Any], actions: list[dict[str, Any]]):
        self.reports.append_row([str(report.get(h, "")) for h in REPORT_HEADERS], value_input_option="USER_ENTERED")
        for action in actions:
            self.actions.append_row([str(action.get(h, "")) for h in ACTION_HEADERS], value_input_option="USER_ENTERED")

    def update_action(self, action: dict[str, Any]):
        rows = self.actions.get_all_records()
        for index, row in enumerate(rows, start=2):
            if str(row.get("action_id")) == str(action.get("action_id")):
                for header in ACTION_HEADERS:
                    if header in action:
                        col = ACTION_HEADERS.index(header) + 1
                        self.actions.update_cell(index, col, str(action[header]))
                return

    def append_daily_brief(self, payload: dict[str, Any]):
        if str(payload.get("brief_date")) in self.daily_briefs.col_values(1):
            return
        self.daily_briefs.append_row([
            str(payload.get("brief_date", "")), str(payload.get("generated_at", "")), str(payload.get("summary", "")),
            str(payload.get("open_actions", 0)), str(payload.get("overdue_actions", 0)), str(payload.get("critical_actions", 0)),
        ], value_input_option="USER_ENTERED")

    def upload_file(self, name: str, data: bytes, mime_type: str | None = None) -> str:
        if not self.drive_connected:
            raise RuntimeError("Connect Google Drive to upload evidence")
        mime_type = mime_type or mimetypes.guess_type(name)[0] or "application/octet-stream"
        metadata = {"name": f"{datetime.now():%Y%m%d-%H%M%S}-{name}", "parents": [self.folder_id]}
        file = self.drive.files().create(
            body=metadata,
            media_body=MediaInMemoryUpload(data, mimetype=mime_type, resumable=True),
            fields="id,webViewLink",
        ).execute()
        return file.get("webViewLink", f"https://drive.google.com/file/d/{file['id']}/view")


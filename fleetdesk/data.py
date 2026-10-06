from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import date, datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo
from typing import Any


def _id(prefix: str) -> str:
    return f"{prefix}-{uuid.uuid4().hex[:7].upper()}"


def india_now() -> datetime:
    return datetime.now(ZoneInfo("Asia/Kolkata"))


def make_demo_data() -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    today = date.today()
    regions = ["Mumbai", "Delhi NCR", "Bengaluru", "Pune", "Hyderabad", "Ahmedabad"]
    issues = [
        ("Vehicle defect", "High", "Brake inspection required after driver reported reduced response", "Safety & Maintenance"),
        ("Documentation", "Medium", "Fitness certificate renewal proof needed", "Fleet Compliance"),
        ("Pre-trip check", "High", "Pre-trip checklist not submitted before departure", "Process Adherence"),
        ("Passenger complaint", "Medium", "Passenger reported AC not cooling on the upper deck", "Customer Operations"),
        ("Safety incident", "Critical", "Minor depot collision; vehicle secured pending inspection", "Safety & Maintenance"),
        ("Vehicle defect", "Medium", "Tyre pressure below operating threshold at departure check", "Safety & Maintenance"),
        ("Operations", "Low", "Route departure was delayed while replacement crew was arranged", "Ground Operations"),
        ("Documentation", "High", "Insurance document image is unclear and requires re-upload", "Fleet Compliance"),
    ]
    owners = ["Fleet Coordinator", "Regional Operations Manager", "Ground Operations", "Safety Team"]
    reports: list[dict[str, Any]] = []
    actions: list[dict[str, Any]] = []
    for i in range(54):
        age = (i * 7 + 1) % 28
        created = today - timedelta(days=age)
        region = regions[(i * 5 + i // 4) % len(regions)]
        category, severity, summary, _ = issues[(i * 3 + i // 6) % len(issues)]
        status = "Closed" if i % 5 == 0 or (i % 7 == 0 and age > 5) else ("In progress" if i % 3 == 0 else "Open")
        due = created + timedelta(days=1 if severity == "Critical" else 3 if severity == "High" else 5)
        if status == "Closed":
            due = min(due, today - timedelta(days=(i % 4)))
        report_id = f"RPT-{created:%y%m}-{1000 + i}"
        action_id = f"ACT-{created:%y%m}-{2000 + i}"
        bus_id = f"FLX-{100 + ((i * 37) % 800)}"
        reports.append({
            "report_id": report_id,
            "created_at": datetime.combine(created, datetime.min.time()).replace(hour=7 + i % 12, minute=(i * 11) % 60).isoformat(timespec="minutes"),
            "region": region,
            "reporter": ["Driver", "Fleet Coordinator", "Ground Operations"][i % 3],
            "category": category,
            "severity": severity,
            "summary": summary,
            "original_text": summary,
            "english_text": summary,
            "detected_language": ["Hindi", "English", "Marathi", "Kannada", "Telugu"][i % 5],
            "bus_id": bus_id,
            "route": ["Mumbai–Pune", "Delhi–Jaipur", "Bengaluru–Chennai", "Pune–Hyderabad"][i % 4],
            "review_status": "Reviewed" if i % 4 else "Pending review",
            "owner": owners[i % len(owners)],
            "due_date": due.isoformat(),
            "status": status,
            "attachment_url": "",
            "audio_url": "",
            "ai_mode": "Synthetic demo data",
        })
        actions.append({
            "action_id": action_id,
            "report_id": report_id,
            "created_at": reports[-1]["created_at"],
            "region": region,
            "bus_id": bus_id,
            "category": category,
            "severity": severity,
            "summary": summary,
            "owner": owners[i % len(owners)],
            "due_date": due.isoformat(),
            "status": status,
            "escalation": "Regional Head" if status != "Closed" and (today - due).days >= 10 else "ROM" if status != "Closed" and (today - due).days >= 5 else "FC" if status != "Closed" and (today - due).days >= 2 else "None",
            "resolution_notes": "Resolved and closure evidence reviewed" if status == "Closed" else "",
            "attachment_url": "",
        })
    return reports, actions


class FleetDeskStore:
    def __init__(self, db_path: Path, google_workspace=None):
        self.db_path = db_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self.google = google_workspace
        self.google_connected = bool(google_workspace and getattr(google_workspace, "connected", False))
        self.google_error = ""
        with self._connect() as db:
            db.execute("CREATE TABLE IF NOT EXISTS reports (report_id TEXT PRIMARY KEY, payload TEXT NOT NULL)")
            db.execute("CREATE TABLE IF NOT EXISTS actions (action_id TEXT PRIMARY KEY, payload TEXT NOT NULL)")
            db.execute("CREATE TABLE IF NOT EXISTS briefs (brief_date TEXT PRIMARY KEY, payload TEXT NOT NULL)")

    def _connect(self):
        return sqlite3.connect(self.db_path)

    def _read_local(self, table: str) -> list[dict[str, Any]]:
        with self._connect() as db:
            rows = db.execute(f"SELECT payload FROM {table}").fetchall()
        return [json.loads(row[0]) for row in rows]

    def list_reports(self) -> list[dict[str, Any]]:
        if self.google_connected:
            try:
                rows = self.google.list_rows("reports")
                if rows:
                    return rows
            except Exception:
                self.google_error = "Could not read the Reports sheet. Check its access and try refreshing."
                pass
        return self._read_local("reports")

    def list_actions(self) -> list[dict[str, Any]]:
        if self.google_connected:
            try:
                rows = self.google.list_rows("actions")
                if rows:
                    return rows
            except Exception:
                self.google_error = "Could not read the Actions sheet. Check its access and try refreshing."
                pass
        return self._read_local("actions")

    def _save_local(self, table: str, key: str, payload: dict[str, Any]):
        with self._connect() as db:
            db.execute(f"INSERT OR REPLACE INTO {table} ({key}, payload) VALUES (?, ?)", (payload[key], json.dumps(payload)))

    def seed_demo(self, reports: list[dict[str, Any]], actions: list[dict[str, Any]]):
        with self._connect() as db:
            existing = db.execute("SELECT COUNT(*) FROM reports").fetchone()[0]
        if not existing:
            for row in reports:
                self._save_local("reports", "report_id", row)
            for row in actions:
                self._save_local("actions", "action_id", row)

    def create_report(
        self,
        result: dict[str, Any],
        region: str,
        reporter: str,
        attachment_bytes: str | None = None,
        attachment_name: str = "",
        audio_bytes: str | None = None,
    ) -> str:
        import base64

        now = india_now()
        report_id = _id("RPT")
        attachment_url = ""
        audio_url = ""
        upload_dir = self.db_path.parent / "uploads"
        upload_dir.mkdir(parents=True, exist_ok=True)

        def save_evidence(data_url: str, filename: str, mime_type: str = "") -> str:
            content = base64.b64decode(data_url)
            if self.google_connected and getattr(self.google, "drive_connected", False):
                try:
                    return self.google.upload_file(filename, content, mime_type or None)
                except Exception:
                    self.google_error = "The report synced, but evidence stayed on this device because Drive upload failed."
            suffix = Path(filename).suffix[:12] or ".bin"
            local_name = f"{uuid.uuid4().hex}{suffix}"
            (upload_dir / local_name).write_bytes(content)
            return f"local://uploads/{local_name}"

        if attachment_bytes:
            attachment_url = save_evidence(attachment_bytes, attachment_name or "field-photo.bin")
        if audio_bytes:
            audio_url = save_evidence(audio_bytes, "field-audio.webm", "audio/webm")
        issues = result.get("issues") or [{
            "summary": result.get("summary", "Field report submitted"),
            "category": result.get("category", "Other"),
            "severity": result.get("severity", "Medium"),
            "bus_id": result.get("bus_id", ""),
            "route": result.get("route", ""),
        }]
        issues = [issue for issue in issues if isinstance(issue, dict)] or [{"summary": "Field report submitted", "category": "Other", "severity": "Medium"}]
        primary = issues[0]
        primary_severity = primary.get("severity", result.get("severity", "Medium"))
        primary_category = primary.get("category", result.get("category", "Other"))
        primary_sla = 0 if primary_severity == "Critical" else 1 if primary_category == "Safety incident" else 2 if primary_category == "Vehicle defect" else 3
        primary_owner = "Safety Team" if primary_severity == "Critical" or primary_category == "Safety incident" else "Ground Operations" if primary_category in {"Passenger complaint", "Operations"} else "Fleet Coordinator"
        due = now.date() + timedelta(days=primary_sla)
        report = {
            "report_id": report_id,
            "created_at": now.isoformat(timespec="minutes"),
            "region": region,
            "reporter": reporter,
            "category": primary_category,
            "severity": primary_severity,
            "summary": result.get("summary", primary.get("summary", "Field report submitted")),
            "original_text": result.get("original_text", ""),
            "english_text": result.get("english_text", ""),
            "detected_language": result.get("detected_language", "Unknown"),
            "bus_id": primary.get("bus_id", result.get("bus_id", "")),
            "route": primary.get("route", result.get("route", "")),
            "review_status": "Evidence review pending" if attachment_url else "Human confirmed",
            "owner": primary_owner,
            "due_date": due.isoformat(),
            "status": "Open",
            "attachment_url": attachment_url,
            "audio_url": audio_url,
            "ai_mode": result.get("ai_mode", "Demo extraction"),
        }
        actions = []
        for issue in issues[:8]:
            severity = issue.get("severity", "Medium")
            category = issue.get("category", report["category"])
            sla_days = 0 if severity == "Critical" else 1 if category == "Safety incident" else 2 if category == "Vehicle defect" else 3
            owner = "Safety Team" if severity == "Critical" or category == "Safety incident" else "Ground Operations" if category in {"Passenger complaint", "Operations"} else "Fleet Coordinator"
            action_due = now.date() + timedelta(days=sla_days)
            actions.append({
                "action_id": _id("ACT"),
                "report_id": report_id,
                "created_at": report["created_at"],
                "region": region,
                "bus_id": issue.get("bus_id", report["bus_id"]),
                "category": category,
                "severity": severity,
                "summary": issue.get("summary", report["summary"]),
                "owner": owner,
                "due_date": action_due.isoformat(),
                "status": "Open",
                "escalation": "Immediate" if severity == "Critical" else "None",
                "resolution_notes": "",
                "attachment_url": attachment_url,
                "audio_url": audio_url,
            })
        self._save_local("reports", "report_id", report)
        for action in actions:
            self._save_local("actions", "action_id", action)
        if self.google_connected:
            try:
                self.google.append_report(report, actions)
            except Exception:
                self.google_error = "Report was saved locally, but could not be written to Sheets. Check sharing and API access."
        return report_id

    def update_action(self, action: dict[str, Any]):
        if not action or not action.get("action_id"):
            return
        current = next((a for a in self.list_actions() if str(a.get("action_id")) == str(action["action_id"])), {})
        updated = {**current, **action}
        self._save_local("actions", "action_id", updated)
        if self.google_connected:
            try:
                self.google.update_action(updated)
            except Exception:
                self.google_error = "Action was saved locally, but the Sheets update failed. Check sharing and API access."

    def get_daily_brief(self, brief_date: str) -> dict[str, Any] | None:
        with self._connect() as db:
            row = db.execute("SELECT payload FROM briefs WHERE brief_date = ?", (brief_date,)).fetchone()
        return json.loads(row[0]) if row else None

    def save_daily_brief(self, payload: dict[str, Any]):
        with self._connect() as db:
            db.execute("INSERT OR REPLACE INTO briefs (brief_date, payload) VALUES (?, ?)", (payload["brief_date"], json.dumps(payload)))
        if self.google_connected:
            try:
                self.google.append_daily_brief(payload)
            except Exception:
                self.google_error = "The brief is saved locally, but could not be written to the Daily Briefs sheet."


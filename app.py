from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from typing import Any

import streamlit as st
from fleetdesk.ai import process_report
from fleetdesk.briefs import generate_daily_summary
from fleetdesk.data import FleetDeskStore, india_now, make_demo_data
from fleetdesk.google_workspace import GoogleWorkspace
from fleetdesk_lite_ui import fleetdesk_lite_ui

ROOT = Path(__file__).parent

st.set_page_config(
    page_title="FleetDesk Lite | Operations Control Tower",
    page_icon="🚌",
    layout="wide",
    initial_sidebar_state="collapsed",
)


def get_settings() -> dict[str, Any]:
    try:
        google = dict(st.secrets.get("google", {}))
        ai = dict(st.secrets.get("ai", {}))
        app = dict(st.secrets.get("app", {}))
    except Exception:
        google, ai, app = {}, {}, {}
    google_ready = bool(google.get("service_account_json") and google.get("spreadsheet_id"))
    ai_ready = bool(ai.get("groq_api_key"))
    return {
        "google": google,
        "ai": ai,
        "app": app,
        "demo_mode": bool(app.get("demo_mode", True)),
        "google_ready": google_ready,
        "ai_ready": ai_ready,
    }


@st.cache_resource
def get_store(google_secrets_json: str, spreadsheet_id: str, drive_credentials_json: str):
    workspace = None
    if google_secrets_json and spreadsheet_id:
        try:
            workspace = GoogleWorkspace(google_secrets_json, spreadsheet_id, drive_credentials_json)
        except Exception:
            workspace = None
    return FleetDeskStore(ROOT / "data" / "fleetdesk.sqlite3", workspace)


# Parked for later: Drive OAuth helpers are intentionally not called in the
# current Sheets-only showcase flow.
def _drive_oauth_client_config(google: dict[str, Any]) -> dict[str, Any]:
    redirect_uri = str(google.get("drive_oauth_redirect_uri", "http://localhost:8501/"))
    return {"web": {
        "client_id": str(google.get("drive_oauth_client_id", "")),
        "client_secret": str(google.get("drive_oauth_client_secret", "")),
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": [redirect_uri],
    }}


def _handle_drive_oauth(google: dict[str, Any]) -> str:
    """Complete the browser OAuth round-trip and return a fresh authorization URL."""
    from google_auth_oauthlib.flow import Flow

    scope = ["https://www.googleapis.com/auth/drive.file"]
    callback_code = st.query_params.get("code")
    callback_state = st.query_params.get("state")
    flow_data = st.session_state.get("drive_oauth_flow")
    if callback_code and flow_data and callback_state == flow_data.get("state"):
        flow = Flow.from_client_config(_drive_oauth_client_config(google), scopes=scope, state=callback_state)
        flow.redirect_uri = flow_data["redirect_uri"]
        flow.code_verifier = flow_data["code_verifier"]
        try:
            flow.fetch_token(code=callback_code)
            st.session_state["drive_credentials_json"] = flow.credentials.to_json()
            st.session_state.pop("drive_oauth_flow", None)
            st.query_params.clear()
            st.rerun()
        except Exception as exc:
            st.session_state["drive_oauth_error"] = f"Drive authorization could not finish: {exc}"
            st.query_params.clear()
    if not google.get("drive_oauth_client_id") or not google.get("drive_oauth_client_secret"):
        return ""
    redirect_uri = str(google.get("drive_oauth_redirect_uri", "http://localhost:8501/"))
    flow = Flow.from_client_config(_drive_oauth_client_config(google), scopes=scope, redirect_uri=redirect_uri)
    authorization_url, state = flow.authorization_url(access_type="offline", prompt="consent", include_granted_scopes="true")
    st.session_state["drive_oauth_flow"] = {
        "state": state,
        "redirect_uri": redirect_uri,
        "code_verifier": flow.code_verifier,
    }
    return authorization_url


def make_payload(store: FleetDeskStore, settings: dict[str, Any]) -> dict[str, Any]:
    reports = store.list_reports()
    actions = store.list_actions()
    if not reports and not actions:
        demo_reports, demo_actions = make_demo_data()
        reports, actions = demo_reports, demo_actions
        store.seed_demo(demo_reports, demo_actions)
    today = india_now().date()
    open_actions = [a for a in actions if a.get("status") != "Closed"]
    overdue = [a for a in open_actions if a.get("due_date") and a["due_date"] < today.isoformat()]
    critical = [a for a in open_actions if a.get("severity") == "Critical"]
    for action in open_actions:
        days_late = 0
        try:
            days_late = max(0, (today - date.fromisoformat(str(action.get("due_date", ""))[:10])).days)
        except ValueError:
            pass
        action["escalation"] = "Immediate" if action.get("severity") == "Critical" else "Regional Head" if days_late >= 10 else "ROM" if days_late >= 5 else "FC" if days_late >= 2 else "None"
    recent_reports = sorted(reports, key=lambda r: r.get("created_at", ""), reverse=True)
    regions: dict[str, dict[str, int]] = {}
    for action in actions:
        region = action.get("region", "Unassigned")
        slot = regions.setdefault(region, {"total": 0, "open": 0, "overdue": 0})
        slot["total"] += 1
        if action.get("status") != "Closed":
            slot["open"] += 1
            if action.get("due_date") and action["due_date"] < today.isoformat():
                slot["overdue"] += 1
    categories: dict[str, int] = {}
    for action in actions:
        category = action.get("category", "Other")
        categories[category] = categories.get(category, 0) + 1
    total = max(1, len(actions))
    closed = sum(a.get("status") == "Closed" for a in actions)
    return {
        "reports": recent_reports[:150],
        "actions": sorted(actions, key=lambda a: (a.get("status") == "Closed", a.get("due_date", "9999")))[:300],
        "regions": [{"region": k, **v} for k, v in sorted(regions.items())],
        "categories": [{"category": k, "count": v} for k, v in sorted(categories.items(), key=lambda x: -x[1])],
        "metrics": {
            "reports_today": sum(str(r.get("created_at", "")).startswith(today.isoformat()) for r in reports),
            "open_actions": len(open_actions),
            "overdue_actions": len(overdue),
            "critical_actions": len(critical),
            "closure_rate": round(100 * closed / total),
            "closed_actions": closed,
            "total_actions": len(actions),
            "pending_review": sum("pending" in str(r.get("review_status", "")).lower() for r in reports),
        },
        "integration": {
            "google_connected": store.google_connected,
            "drive_connected": bool(store.google and getattr(store.google, "drive_connected", False)),
            "drive_connect_url": settings.get("drive_connect_url", ""),
            "google_error": store.google_error,
            "ai_connected": settings["ai_ready"],
            "mode": "Google Sheets + Drive" if store.google_connected and store.google and getattr(store.google, "drive_connected", False) else "Google Sheets" if store.google_connected else "Local showcase database",
            "ai_mode": "Groq AI ready" if settings["ai_ready"] else "Demo extraction",
        },
        "generated_at": india_now().strftime("%d %b %Y, %I:%M %p"),
        "daily_summary": (store.get_daily_brief(today.isoformat()) or {}).get("summary", ""),
    }


def handle_event(event: dict[str, Any], store: FleetDeskStore, settings: dict[str, Any]):
    kind = event.get("type")
    if kind == "navigate":
        st.session_state["page"] = event.get("page", "report")
    elif kind == "analyze_report":
        with st.spinner("Structuring report…"):
            result = process_report(
                text=event.get("text", ""),
                audio_bytes=event.get("audio_base64"),
                language=event.get("language", "Auto-detect"),
                selected_type=event.get("selected_type", "Other"),
                api_key=settings["ai"].get("groq_api_key", ""),
                transcription_model=settings["ai"].get("groq_transcription_model", "whisper-large-v3-turbo"),
                model=settings["ai"].get("groq_model", "openai/gpt-oss-20b"),
            )
            st.session_state["pending_report"] = {
                "result": result,
                "region": event.get("region", "Mumbai"),
                "reporter": event.get("reporter", "Field reporter"),
                "attachment_base64": event.get("attachment_base64"),
                "attachment_name": event.get("attachment_name", ""),
                "audio_base64": event.get("audio_base64"),
            }
            st.session_state["page"] = "confirm"
    elif kind == "confirm_report":
        pending = st.session_state.get("pending_report", {})
        result = {**pending.get("result", {}), **event.get("fields", {})}
        report_id = store.create_report(
            result=result,
            region=pending.get("region", "Mumbai"),
            reporter=pending.get("reporter", "Field reporter"),
            attachment_bytes=pending.get("attachment_base64"),
            attachment_name=pending.get("attachment_name", ""),
            audio_bytes=pending.get("audio_base64"),
        )
        st.session_state.pop("pending_report", None)
        st.session_state["toast"] = f"Report {report_id} submitted and added to the action tracker."
        st.session_state["page"] = "tracker"
    elif kind == "update_action":
        store.update_action(event.get("action", {}))
        st.session_state["toast"] = "Action updated."
    elif kind == "refresh":
        st.session_state["toast"] = "Workspace refreshed."
    elif kind == "generate_brief":
        actions, reports = store.list_actions(), store.list_reports()
        summary = generate_daily_summary(
            actions, reports, settings["ai"].get("groq_api_key", ""),
            settings["ai"].get("groq_model", "openai/gpt-oss-20b"),
        )
        brief = _brief_record(summary, actions)
        store.save_daily_brief(brief)
        st.session_state["toast"] = "Daily brief refreshed from current reports and actions."


def _brief_record(summary: str, actions: list[dict[str, Any]]) -> dict[str, Any]:
    today = india_now().date()
    open_actions = [a for a in actions if a.get("status") != "Closed"]
    overdue = [a for a in open_actions if str(a.get("due_date", ""))[:10] < today.isoformat()]
    critical = [a for a in open_actions if a.get("severity") == "Critical"]
    return {
        "brief_date": today.isoformat(),
        "generated_at": india_now().isoformat(timespec="minutes"),
        "summary": summary,
        "open_actions": len(open_actions),
        "overdue_actions": len(overdue),
        "critical_actions": len(critical),
    }


def main():
    settings = get_settings()
    google = settings["google"]
    # Drive OAuth is intentionally parked for this showcase; connect Sheets only.
    # To re-enable Drive later, uncomment the OAuth initialization above and pass
    # its session credentials to get_store instead of this empty string.
    drive_credentials = ""
    store = get_store(
        google.get("service_account_json", ""),
        google.get("spreadsheet_id", ""),
        drive_credentials,
    )
    if settings["google_ready"] and not store.google_connected and not store.google_error:
        store.google_error = "Google Sheets could not connect. Check the service account JSON, Sheet ID, sharing, and enabled APIs."
    schedule_time = str(settings["app"].get("daily_brief_time", "18:00"))
    try:
        hour, minute = (int(part) for part in schedule_time.split(":", 1))
        now_ist = india_now()
        today_key = now_ist.date().isoformat()
        if (now_ist.hour, now_ist.minute) >= (hour, minute) and not store.get_daily_brief(today_key):
            summary = generate_daily_summary(store.list_actions(), store.list_reports(), settings["ai"].get("groq_api_key", ""), settings["ai"].get("groq_model", "openai/gpt-oss-20b"))
            store.save_daily_brief(_brief_record(summary, store.list_actions()))
    except (ValueError, TypeError):
        pass
    if "page" not in st.session_state:
        st.session_state["page"] = "report"
    if "toast" not in st.session_state:
        st.session_state["toast"] = ""
    payload = make_payload(store, settings)
    payload["page"] = st.session_state["page"]
    payload["toast"] = st.session_state["toast"]
    payload["pending_report"] = st.session_state.get("pending_report")
    st.session_state["toast"] = ""

    result = fleetdesk_lite_ui(
        payload,
        key="fleetdesk_main",
        on_event_change=lambda: None,
    )
    event = result.event
    if isinstance(event, dict):
        handle_event(event, store, settings)
        st.rerun()


if __name__ == "__main__":
    main()

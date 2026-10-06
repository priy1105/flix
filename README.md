# FleetDesk Lite

**Field Operations & Compliance Control Tower** — an independent portfolio concept inspired by the Project Associate, Operations role. It is not an official Flix product and uses synthetic showcase records. The FlixBus logo is loaded from the public Flix design-system asset for this concept; replace or remove it if you do not have permission for a public portfolio deployment.

FleetDesk turns unstructured field reports into operational actions:

**Capture → transcribe/structure → human confirmation → assign → track → escalate → review trends → close**

## What is included

- A mobile-first React interface, embedded inside Streamlit as a custom component.
- Field report capture by typed note, browser audio recording/audio upload, and photo/document attachment.
- Optional Groq transcription and report structuring, with a demo extraction fallback.
- A human confirmation step before a report becomes an action.
- An action tracker with owner, due date, status, escalation, closure notes, search, and filters.
- Operations overview, exception centre, regional insights, recurring issue view, and a daily brief.
- Google Sheets integration for structured report/action records, plus a clearly marked Google Drive evidence workflow preview in the UI.
- Local SQLite storage plus synthetic records for a self-contained showcase.

The React UI uses small shadcn-style primitives (`Button`, `Badge`, `Card`) and Lucide icons. It is embedded with Streamlit's v2 custom-component system, based on the official Streamlit React component template. Streamlit and Python own persistence, API calls, operational rules, and event handling.

## Run locally

Requirements: Python 3.10+ and Node.js 20+. The React component is already built in `fleetdesk_lite_ui/frontend/build`; no pnpm command is needed just to run this checkout.

```powershell
python -m venv .venv  # first time only
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
streamlit run app.py
```

Without credentials, the app runs using synthetic sample records and local SQLite. The first run creates `data/fleetdesk.sqlite3`.

## Optional Google Sheets setup

For this showcase, only Google Sheets is connected. Enable **Google Sheets API**, create the service account key, and share your Sheet with the service account email as Editor. In `.streamlit/secrets.toml`, add the complete downloaded service-account JSON inside the triple single quotes shown in `.streamlit/secrets.toml.example`, plus the Sheet ID. That literal TOML string preserves the JSON private-key `\n` escapes. Restart Streamlit. The app creates `Reports`, `Actions`, and `Daily Briefs` tabs as needed. `google.service_account_json` and `google.spreadsheet_id` are required for Sheets; `ai.groq_api_key` is optional and enables the real transcription/AI flow.

Drive sign-in and cloud evidence uploads are parked for now. Report photos and audio stay in local `data/uploads` while structured report and action data syncs to Sheets. Do not commit `.streamlit/secrets.toml` or put credentials in React.

## Optional Groq AI

1. Create a Groq API key on the provider's free plan.
2. Add it to `ai.groq_api_key` in `.streamlit/secrets.toml`.
3. The defaults use `whisper-large-v3-turbo` for transcription and `openai/gpt-oss-20b` for translation/structured extraction. Change model IDs in secrets if your account's currently available models differ.

If no key is set, or an AI request fails, report extraction uses a deterministic demo fallback. A human must review the result before saving. Model suggestions are not safety/compliance decisions. Free API quotas and model availability can change; demo mode keeps the portfolio flow usable without consuming API calls.

The daily brief can be generated on demand, and the app also creates one per India-local day after the configured `app.daily_brief_time` (default `18:00`) when the app is active. This showcase does not run a separate background scheduler while Streamlit is asleep.

## Google integration behavior

- With valid Sheets credentials, structured reports and actions are written to Sheets. Drive uploads are disabled for now; attached media stays local.
- If the Google connection is absent or unavailable, records stay in local SQLite and the UI remains usable.
- Google errors fall back to local persistence for this showcase. Check the Sheets/Drive tabs for successful writes before treating an action as synchronized.
- On Streamlit Community Cloud, local SQLite and uploaded media are ephemeral across restarts. Google Sheets keeps the structured records in a hosted demo.

## Deploy the showcase

1. Push this repository to a GitHub repository.
2. Ensure `fleetdesk_lite_ui/frontend/build` is included in the GitHub repository. It is already built in this checkout; if you later edit the React UI, rebuild it before deploying.
3. Deploy `app.py` on Streamlit Community Cloud. Add the same TOML sections and values from `.streamlit/secrets.toml` to App settings → Secrets. Streamlit exposes those settings through `st.secrets`; it does not automatically load `.env` files. Never include service account JSON or API keys in the repository.
4. Keep the data synthetic and clearly labelled for the portfolio demo.

Streamlit Community Cloud's filesystem and free API tiers are intended for showcase usage, not production fleet data. Avoid real passenger, staff, safety, or operator information in this independent demo.

## Google Sheets columns

`Reports` stores report IDs, timestamps, region/reporter, source and translated text, category/severity, bus/route extraction, review state, action owner/date/status, and Drive links.

`Actions` stores action IDs, report reference, region/bus/category/severity, summary, owner, due date, status, escalation, resolution notes, and evidence link.

## UI source layout

```text
app.py                         Streamlit host, settings, event routing
fleetdesk/ai.py                Free-tier Groq calls and demo fallback
fleetdesk/data.py              SQLite persistence and synthetic dataset
fleetdesk/google_workspace.py  Sheets + Drive adapters
fleetdesk_lite_ui/__init__.py  Streamlit v2 component registration and API
fleetdesk_lite_ui/frontend/    Official template-based React component project
fleetdesk/                     Python persistence, AI, briefs, and Google adapters
fleetdesk_lite_ui/frontend/src/components/ui/ Reusable shadcn-style primitives
fleetdesk_lite_ui/frontend/src/FleetDesk.css  Responsive Flix-inspired theme
```

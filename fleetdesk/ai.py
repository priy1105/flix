from __future__ import annotations

import base64
import json
import re
import urllib.error
import urllib.request
from datetime import date, timedelta
from typing import Any


ALLOWED_CATEGORIES = [
    "Safety incident", "Vehicle defect", "Pre-trip check", "Passenger complaint",
    "Documentation", "Operations", "Other",
]
ALLOWED_SEVERITIES = ["Low", "Medium", "High", "Critical"]


def _groq_request(api_key: str, body: dict[str, Any], timeout: int = 45) -> dict[str, Any]:
    request = urllib.request.Request(
        "https://api.groq.com/openai/v1/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def _transcribe(api_key: str, audio: bytes, filename: str, model: str) -> str:
    boundary = "----FleetDeskBoundary7MA4YWxkTrZu0gW"
    parts = [
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{filename or 'field-note.webm'}\"\r\nContent-Type: application/octet-stream\r\n\r\n".encode(),
        audio,
        f"\r\n--{boundary}\r\nContent-Disposition: form-data; name=\"model\"\r\n\r\n{model}\r\n--{boundary}--\r\n".encode(),
    ]
    request = urllib.request.Request(
        "https://api.groq.com/openai/v1/audio/transcriptions",
        data=b"".join(parts),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=90) as response:
        return json.loads(response.read().decode("utf-8")).get("text", "")


def _parse_json(text: str) -> dict[str, Any]:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", text.strip(), flags=re.I)
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", cleaned, re.S)
        return json.loads(match.group(0)) if match else {}


def _demo_extract(text: str, selected_type: str) -> dict[str, Any]:
    lower = text.lower()
    mapping = {
        "brake": ("Vehicle defect", "High"), "tyre": ("Vehicle defect", "High"), "tire": ("Vehicle defect", "High"),
        "accident": ("Safety incident", "Critical"), "injury": ("Safety incident", "Critical"),
        "complaint": ("Passenger complaint", "Medium"), "certificate": ("Documentation", "Medium"),
        "document": ("Documentation", "Medium"), "check": ("Pre-trip check", "Medium"),
    }
    category, severity = selected_type, "Medium"
    for token, value in mapping.items():
        if token in lower:
            category, severity = value
            break
    bus = re.search(r"(?:bus\s*)?(?:FLX[- ]?)?(\d{2,5})", text, re.I)
    summary = text.strip()[:180] or "Field report submitted for review"
    return {
        "summary": summary,
        "original_text": text,
        "english_text": text,
        "detected_language": "Auto-detected / demo",
        "category": category,
        "severity": severity,
        "bus_id": f"FLX-{bus.group(1)}" if bus else "",
        "route": "",
        "confidence": 0.74,
        "needs_follow_up": not bool(bus),
        "follow_up_question": "Which bus is this report about?" if not bus else "",
        "ai_mode": "Demo extraction",
        "issues": [{"summary": summary, "category": category, "severity": severity, "bus_id": f"FLX-{bus.group(1)}" if bus else "", "route": ""}],
    }


def process_report(
    text: str,
    audio_bytes: str | None,
    language: str,
    selected_type: str,
    api_key: str,
    transcription_model: str,
    model: str,
) -> dict[str, Any]:
    audio = base64.b64decode(audio_bytes) if audio_bytes else None
    if audio and api_key:
        try:
            text = _transcribe(api_key, audio, "field-note.webm", transcription_model) or text
        except Exception:
            pass
    if not text.strip():
        text = "Field report submitted with an attached audio note. Please review the recording."
    if not api_key:
        return _demo_extract(text, selected_type)
    schema_prompt = (
        "Return only a JSON object with keys summary, english_text, detected_language, category, severity, bus_id, route, confidence, "
        "needs_follow_up, follow_up_question, issues. The issues key must be an array with one item per distinct actionable issue; each item has summary, category, severity, bus_id, route. "
        "Use category from: " + ", ".join(ALLOWED_CATEGORIES) + ". "
        "Use severity from: " + ", ".join(ALLOWED_SEVERITIES) + ". Translate to English, preserve original meaning, do not invent missing facts. "
        "If the bus identifier is missing, set needs_follow_up true and ask one short follow-up question in the reporter's language. "
        "Top-level summary describes the whole report. Translate to English and preserve the original meaning; do not invent missing facts."
    )
    try:
        response = _groq_request(api_key, {
            "model": model,
            "temperature": 0.1,
            "messages": [
                {"role": "system", "content": schema_prompt},
                {"role": "user", "content": f"Selected report type: {selected_type}\nReporter language: {language}\nReport: {text}"},
            ],
        })
        result = _parse_json(response["choices"][0]["message"]["content"])
        result["original_text"] = text
        result["category"] = result.get("category") if result.get("category") in ALLOWED_CATEGORIES else "Other"
        result["severity"] = result.get("severity") if result.get("severity") in ALLOWED_SEVERITIES else "Medium"
        result["bus_id"] = str(result.get("bus_id") or "")
        result["route"] = str(result.get("route") or "")
        result["confidence"] = float(result.get("confidence") or 0.7)
        result["ai_mode"] = "Groq AI"
        issues = result.get("issues")
        if not isinstance(issues, list) or not issues:
            issues = [{"summary": result.get("summary", text), "category": result["category"], "severity": result["severity"], "bus_id": result["bus_id"], "route": result["route"]}]
        result["issues"] = [
            {
                "summary": str(item.get("summary") or result.get("summary") or text)[:240],
                "category": item.get("category") if item.get("category") in ALLOWED_CATEGORIES else result["category"],
                "severity": item.get("severity") if item.get("severity") in ALLOWED_SEVERITIES else result["severity"],
                "bus_id": str(item.get("bus_id") or result["bus_id"]),
                "route": str(item.get("route") or result["route"]),
            }
            for item in issues[:8] if isinstance(item, dict)
        ] or [{"summary": result.get("summary", text), "category": result["category"], "severity": result["severity"], "bus_id": result["bus_id"], "route": result["route"]}]
        return result
    except Exception:
        result = _demo_extract(text, selected_type)
        result["ai_mode"] = "Demo fallback (AI unavailable)"
        return result


from __future__ import annotations

from collections import Counter
from typing import Any

from .ai import _groq_request, _parse_json


def generate_daily_summary(actions: list[dict[str, Any]], reports: list[dict[str, Any]], api_key: str, model: str) -> str:
    open_actions = [row for row in actions if row.get("status") != "Closed"]
    overdue = [row for row in open_actions if _is_overdue(row.get("due_date", ""))]
    critical = [row for row in open_actions if row.get("severity") == "Critical"]
    by_region = Counter(row.get("region", "Unassigned") for row in overdue)
    by_category = Counter(row.get("category", "Other") for row in overdue)
    observed = {
        "open_actions": len(open_actions),
        "overdue_actions": len(overdue),
        "critical_open_actions": len(critical),
        "reports_in_dataset": len(reports),
        "overdue_by_region": dict(by_region.most_common(4)),
        "overdue_by_category": dict(by_category.most_common(4)),
    }
    factual = (
        f"There are {len(open_actions)} open actions, including {len(overdue)} overdue and {len(critical)} marked critical. "
        + (f"{by_region.most_common(1)[0][0]} has the largest overdue count ({by_region.most_common(1)[0][1]})." if by_region else "No overdue actions are currently recorded.")
    )
    if not api_key:
        return factual + " This is a summary of recorded data; validate causes with the regional team."
    try:
        response = _groq_request(api_key, {
            "model": model,
            "temperature": 0.1,
            "messages": [
                {"role": "system", "content": "Write a concise 2-3 sentence operations brief from supplied aggregate facts. Separate observed numbers from possible explanations. Never claim a cause that the data does not prove. Do not invent actions, dates, or percentages. Plain language, no markdown."},
                {"role": "user", "content": f"Observed aggregate data: {observed}\nStart from the factual summary: {factual}"},
            ],
        })
        return _parse_json(response["choices"][0]["message"]["content"]).get("summary", response["choices"][0]["message"]["content"]).strip()
    except Exception:
        return factual + " This is a summary of recorded data; validate causes with the regional team."


def _is_overdue(value: str) -> bool:
    import datetime
    from zoneinfo import ZoneInfo

    return bool(value) and str(value)[:10] < datetime.datetime.now(ZoneInfo("Asia/Kolkata")).date().isoformat()

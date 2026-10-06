from __future__ import annotations

from collections.abc import Callable
from typing import Any

import streamlit as st


_COMPONENT = st.components.v2.component(
    "fleetdesk-lite-ui.fleetdesk_lite_ui",
    html='<div class="react-root"></div>',
    js="index-*.js",
    css="index-*.css",
)


def fleetdesk_lite_ui(
    payload: dict[str, Any],
    *,
    key: str,
    on_event_change: Callable[[], None] | None = None,
):
    """Mount FleetDesk's React control tower as a Streamlit v2 component."""
    return _COMPONENT(
        key=key,
        data={"payload": payload},
        on_event_change=on_event_change or (lambda: None),
    )

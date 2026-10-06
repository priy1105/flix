import React from "react";
import { cn } from "../../lib/utils";

export function Badge({ children, tone = "neutral", dot = false, className = "" }) {
  return <span className={cn("badge", `badge-${tone}`, className)}>{dot && <i />}{children}</span>;
}

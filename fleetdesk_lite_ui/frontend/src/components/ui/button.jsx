import React from "react";
import { cn } from "../../lib/utils";

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
  return <button className={cn("button", `button-${variant}`, `button-${size}`, className)} {...props}>{children}</button>;
}

import React from "react";
import { cn } from "../../lib/utils";

export function Card({ children, className = "", ...props }) {
  return <section className={cn("card", className)} {...props}>{children}</section>;
}

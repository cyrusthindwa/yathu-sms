import * as React from "react";
import { cn } from "@/lib/utils";

type FieldProps = React.ComponentProps<"div"> & {
  hint?: React.ReactNode;
  htmlFor?: string;
  label?: React.ReactNode;
};
export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ children, className, hint, htmlFor, label, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="field"
      className={cn("field", className)}
      {...props}
    >
      {label ? <label htmlFor={htmlFor}>{label}</label> : null}
      {children}
      {hint ? <small aria-live="polite">{hint}</small> : null}
    </div>
  ),
);
Field.displayName = "Field";

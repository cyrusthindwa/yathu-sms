import * as React from "react";
import { cn } from "@/lib/utils";
type SeparatorProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};
export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      data-slot="separator"
      data-orientation={orientation}
      className={cn("separator", className)}
      {...props}
    />
  ),
);
Separator.displayName = "Separator";

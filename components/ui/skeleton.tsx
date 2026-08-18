import * as React from "react";
import { cn } from "@/lib/utils";
export const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="skeleton"
    aria-hidden="true"
    className={cn("skeleton", className)}
    {...props}
  />
));
Skeleton.displayName = "Skeleton";

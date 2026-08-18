import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
type SpinnerProps = React.ComponentProps<typeof LoaderCircle> & {
  label?: string;
};
export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, label = "Loading", ...props }, ref) => (
    <LoaderCircle
      ref={ref}
      data-slot="spinner"
      className={cn("spinner", className)}
      role="status"
      aria-label={label}
      {...props}
    />
  ),
);
Spinner.displayName = "Spinner";

import * as React from "react";
import { cn } from "@/lib/utils";
type ProgressProps = React.ComponentProps<"div"> & { value?: number };
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    const progress = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        data-slot="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className={cn("progress", className)}
        {...props}
      >
        <div
          className="progress-indicator"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";

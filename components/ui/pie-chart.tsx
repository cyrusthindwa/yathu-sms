import * as React from "react";
import { cn } from "@/lib/utils";

type PieChartProps = React.ComponentProps<"div"> & {
  value: number;
  label: string;
  caption: string;
};
export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  ({ caption, className, label, style, value, ...props }, ref) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    return (
      <div
        ref={ref}
        role="img"
        aria-label={`${clampedValue}% ${label}, ${caption}`}
        className={cn("pie-chart", className)}
        style={{
          background: `conic-gradient(var(--green) 0 ${clampedValue}%, var(--amber) ${clampedValue}% ${Math.min(clampedValue + 18, 100)}%, var(--rose) ${Math.min(clampedValue + 18, 100)}% 100%)`,
          ...style,
        }}
        {...props}
      >
        <div className="pie-hole">
          <strong>{clampedValue}%</strong>
          <span>{label}</span>
        </div>
      </div>
    );
  },
);
PieChart.displayName = "PieChart";

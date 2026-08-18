import * as React from "react";
import { cn } from "@/lib/utils";

type BreadcrumbProps = React.ComponentProps<"nav"> & {
  items: React.ReactNode[];
};
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn("breadcrumb", className)}
      {...props}
    >
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </nav>
  ),
);
Breadcrumb.displayName = "Breadcrumb";

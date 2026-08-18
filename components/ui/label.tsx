import * as React from "react";
import { cn } from "@/lib/utils";
export const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(({ className, ...props }, ref) => <label ref={ref} data-slot="label" className={cn("label", className)} {...props} />);
Label.displayName = "Label";

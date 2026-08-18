import * as React from "react";
import { cn } from "@/lib/utils";
export const ScrollArea = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-slot="scroll-area" className={cn("scroll-area", className)} {...props} />);
ScrollArea.displayName = "ScrollArea";

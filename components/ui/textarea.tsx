import * as React from "react";
import { cn } from "@/lib/utils";
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => <textarea ref={ref} data-slot="textarea" className={cn("textarea", className)} {...props} />);
Textarea.displayName = "Textarea";

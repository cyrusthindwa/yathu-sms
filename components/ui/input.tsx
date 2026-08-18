import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leading?: ReactNode;
  wrapperClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leading, wrapperClassName, className, ...props }, ref) => (
    <div
      data-slot="input-wrapper"
      className={cn("input-wrap", wrapperClassName)}
    >
      {leading}
      <input ref={ref} data-slot="input" className={className} {...props} />
    </div>
  ),
);

Input.displayName = "Input";

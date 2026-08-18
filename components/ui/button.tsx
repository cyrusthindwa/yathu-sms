import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
export const buttonVariants = cva("btn", { variants: { variant: { primary: "", secondary: "secondary", ghost: "ghost" }, size: { default: "", sm: "sm", icon: "icon" } }, defaultVariants: { variant: "primary", size: "default" } });
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, size, className, ...props }, ref) => <button ref={ref} data-slot="button" data-variant={variant} data-size={size} className={cn(buttonVariants({ variant, size }), className)} {...props} />);
Button.displayName = "Button";

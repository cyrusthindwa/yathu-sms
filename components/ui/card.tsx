import * as React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"section"> & { size?: "default" | "sm" };

export const Card = React.forwardRef<HTMLElement, CardProps>(({ className, size = "default", ...props }, ref) => <section ref={ref} data-slot="card" data-size={size} className={cn("card", className)} {...props} />);
Card.displayName = "Card";

type CardHeaderProps = React.ComponentProps<"div"> & { eyebrow?: React.ReactNode; title?: React.ReactNode; action?: React.ReactNode };
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ action, children, className, eyebrow, title, ...props }, ref) => <div ref={ref} data-slot="card-header" className={cn("card-header", className)} {...props}><div>{eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}{title ? <CardTitle>{title}</CardTitle> : null}{children}</div>{action ? <CardAction>{action}</CardAction> : null}</div>);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.ComponentProps<"h3">>(({ className, ...props }, ref) => <h3 ref={ref} data-slot="card-title" className={cn("card-title", className)} {...props} />);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.ComponentProps<"p">>(({ className, ...props }, ref) => <p ref={ref} data-slot="card-description" className={cn("muted", className)} {...props} />);
CardDescription.displayName = "CardDescription";

export const CardAction = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-slot="card-action" className={cn("card-action", className)} {...props} />);
CardAction.displayName = "CardAction";

export const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-slot="card-content" className={cn("card-content", className)} {...props} />);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => <div ref={ref} data-slot="card-footer" className={cn("card-footer", className)} {...props} />);
CardFooter.displayName = "CardFooter";

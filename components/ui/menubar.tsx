import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type MenuItem = { href: string; label: React.ReactNode };
type MenuBarProps = React.ComponentProps<"nav"> & { items: MenuItem[] };
export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(({ className, items, ...props }, ref) => <nav ref={ref} aria-label="Primary navigation" className={cn("menu-bar", className)} {...props}>{items.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</nav>);
MenuBar.displayName = "MenuBar";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuBar, MenuItem } from "@/components/ui/menubar";
type HeaderProps = React.ComponentProps<"header"> & { brand: string; brandHref?: string; navigation?: MenuItem[]; actions?: React.ReactNode; mark?: string };
export const Header = React.forwardRef<HTMLElement, HeaderProps>(({ actions, brand, brandHref = "/", className, mark, navigation = [], ...props }, ref) => <header ref={ref} data-slot="header" className={cn("topbar", className)} {...props}><Link className="brand" href={brandHref}><span className="brand-mark">{mark ?? brand.charAt(0)}</span><span>{brand}</span></Link><MenuBar items={navigation} /><div className="topbar-actions">{actions}</div></header>);
Header.displayName = "Header";

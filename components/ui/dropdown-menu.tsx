"use client";
import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
type DropdownItem = { label: React.ReactNode; onSelect?: () => void; destructive?: boolean; disabled?: boolean } | React.ReactNode;
type DropdownMenuProps = Omit<Menu.Root.Props, "children"> & { trigger: React.ReactNode; items: DropdownItem[]; align?: "start" | "end"; className?: string; contentProps?: Omit<Menu.Popup.Props, "children"> };
export function DropdownMenu({ align = "end", className, contentProps, items, trigger, ...props }: DropdownMenuProps) { return <Menu.Root {...props}><Menu.Trigger render={<span className="dropdown-trigger" />}>{trigger}</Menu.Trigger><Menu.Portal><Menu.Positioner align={align} sideOffset={7}><Menu.Popup data-slot="dropdown-menu" className={cn("dropdown-menu", className)} {...contentProps}>{items.map((entry, index) => { const item = typeof entry === "object" && entry !== null && "label" in entry ? entry : { label: entry }; return <Menu.Item key={index} disabled={item.disabled} className={cn("dropdown-item", item.destructive && "destructive")} onClick={item.onSelect}>{item.label}</Menu.Item>; })}</Menu.Popup></Menu.Positioner></Menu.Portal></Menu.Root>; }

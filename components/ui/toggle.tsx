"use client";
import { Switch } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
type ToggleProps = { checked: boolean; onChange: (value: boolean) => void } & Omit<Switch.Root.Props, "checked" | "onCheckedChange">;
export function Toggle({ checked, className, onChange, ...props }: ToggleProps) { return <Switch.Root checked={checked} onCheckedChange={onChange} data-slot="toggle" className={cn("toggle", className)} {...props}><Switch.Thumb className="toggle-thumb" /></Switch.Root>; }

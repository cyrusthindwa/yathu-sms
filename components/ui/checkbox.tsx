"use client";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
} & Omit<BaseCheckbox.Root.Props, "checked" | "onCheckedChange">;
export function Checkbox({
  checked,
  className,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      checked={checked}
      onCheckedChange={onChange}
      data-slot="checkbox"
      className={cn("checkbox", className)}
      {...props}
    >
      <BaseCheckbox.Indicator>
        <IconCheck size={12} stroke={3} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}

"use client";
import * as React from "react";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
type RadioOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};
type RadioGroupProps = Omit<React.ComponentProps<"fieldset">, "onChange"> & {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};
export const RadioGroup = React.forwardRef<
  HTMLFieldSetElement,
  RadioGroupProps
>(
  (
    { className, defaultValue, options, value, onValueChange, ...props },
    ref,
  ) => (
    <fieldset
      ref={ref}
      data-slot="radio-group"
      className={cn("radio-group", className)}
      {...props}
    >
      <BaseRadioGroup
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <label className="radio-option" key={option.value}>
            <Radio.Root
              value={option.value}
              disabled={option.disabled}
              className="radio"
            >
              <Radio.Indicator className="radio-indicator" />
            </Radio.Root>
            <span>
              <b>{option.label}</b>
              {option.description ? <small>{option.description}</small> : null}
            </span>
          </label>
        ))}
      </BaseRadioGroup>
    </fieldset>
  ),
);
RadioGroup.displayName = "RadioGroup";

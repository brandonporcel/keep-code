"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
type SwitchDemoProps = {
  text: string;
  className?: string;
  labelClassName?: string;
  onChange?: (isChecked: boolean) => void;
};

export function PrivateSwitch({
  text,
  className,
  labelClassName,
  onChange,
}: SwitchDemoProps) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) onChange(newCheckedState);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Switch
        checked={isChecked}
        id="is-private"
        onCheckedChange={handleChange}
      />
      <Label htmlFor="is-private" className={cn(labelClassName)}>
        {text}
      </Label>
    </div>
  );
}

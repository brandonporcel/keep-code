import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
type SwitchDemoProps = {
  text: string;
  className?: string;
  labelClassName?: string;
};
export function PrivateSwitch({
  text,
  className,
  labelClassName,
}: SwitchDemoProps) {
  return (
    // <div className="flex items-center space-x-2">
    <div className={cn("flex items-center space-x-2", className)}>
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode" className={cn(labelClassName)}>
        {text}
      </Label>
    </div>
  );
}

import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { LucideIcon } from "lucide-react";
type IconWrapperProps = {
  icon:
    | LucideIcon
    | ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  text?: string;
};

export default function IconWrapper({ icon, text }: IconWrapperProps) {
  const Icon = icon;
  return (
    <div className="relative cursor-pointer group w-10 h-10 flex items-center justify-center">
      <span className="absolute -inset-2 rounded-full bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      <Icon height={24} width={24} className="relative z-10" />
      {text && (
        <span className="absolute left-1/2 transform -translate-x-1/2 top-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity w-max">
          {text}
        </span>
      )}
    </div>
  );
}

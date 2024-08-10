import { cn } from "@/lib/utils";

const Sidebar = () => {
  const containerClasses = cn(
    "min-w-[13rem]",
    "max-w-[15rem]",
    "w-full",
    "py-2",
    "bg-[#151718]",
    "rounded-2xl",
    "sticky",
    "overflow-hidden",
    "transition-all",
    "duration-300",
    "h-fit",
    "delay-100"
  );

  return (
    <div className={containerClasses}>
      <p>sidebar</p>
    </div>
  );
};

export default Sidebar;

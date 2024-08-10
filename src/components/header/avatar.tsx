import {
  Avatar as AvatarDemo,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function Avatar() {
  return (
    <AvatarDemo className="cursor-pointer">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarDemo>
  );
}

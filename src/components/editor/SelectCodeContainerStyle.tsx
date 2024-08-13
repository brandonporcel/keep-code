import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SnippetStyle } from "@/lib/enums/snippet-style.enum";

type SelectCodeContainerStyleProps = {
  onChange?: (value: string | undefined) => void;
  value?: number;
};

export function SelectCodeContainerStyle({
  onChange,
  value,
}: SelectCodeContainerStyleProps) {
  const STYLES = [
    { id: 1, value: 1, description: "test.ts" },
    { id: 2, value: 2, description: "api.php" },
  ];

  return (
    <Select
      // onValueChange={onChange}
      // value={String(value)}
      defaultValue={String(SnippetStyle.Default)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select ur fav" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Files</SelectLabel>
          {STYLES.map(({ id, description, value }) => (
            <SelectItem key={id} value={String(value)}>
              {description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

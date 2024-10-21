"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Snippet } from "@/lib/types/snippet";

type Props = {
  formState: Snippet;
  selectedFileId: string | null;
  onChange: (category: string) => void;
};

function FileSelector({ formState, selectedFileId, onChange }: Props) {
  return (
    <Select
      value={selectedFileId || ""}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-[180px] h-10 text-normal-case ring-[var(--ring)]">
        <SelectValue placeholder="Select a file" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {formState.files.map((file) => (
            <SelectItem
              className="text-normal-case"
              key={file.id}
              value={file.id}
            >
              {file.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileSelector;

"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pin, Trash2Icon } from "lucide-react";
import FileSelector from "../filters/file-selector";
import { Button } from "../ui/button";
import { Snippet } from "@/lib/types/snippet";
import CreateCodeContainer from "../editor/CreateCodeContainer";
import {
  addNewFile,
  handleFileContentChange,
  handleFileNameChange,
  removeFile,
} from "@/lib/utils/editor_form_utils";

type FormProps = {
  handleChange: (e: any) => void;
  formState: Snippet;
  setFormState: React.Dispatch<React.SetStateAction<Snippet>>;
  errors: Record<string, string | null>;
};
export default function Form({
  handleChange,
  formState,
  errors,
  setFormState,
}: FormProps) {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(
    formState.files.length > 0 ? formState.files[0].id : null
  );

  const handleAddNewFile = () => {
    addNewFile(formState, setFormState, setSelectedFileId);
  };

  const handleDeleteFile = () => {
    removeFile(selectedFileId, formState, setFormState, setSelectedFileId);
  };

  const handleChangeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileNameChange(
      selectedFileId,
      e?.target.value,
      formState,
      setFormState
    );
  };

  const handleChangeFileContent = (value: string | undefined) => {
    handleFileContentChange(
      selectedFileId,
      value || "",
      formState,
      setFormState
    );
  };

  const handleFileSelect = (value: string) => {
    if (value) {
      setSelectedFileId(value);
    }
  };

  return (
    <form>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Input
          name="title"
          value={formState.title}
          placeholder="Title"
          onChange={handleChange}
          className="border-0 focus-visible:ring-0 placeholder:text-xl text-xl"
          ctnClassName="w-full"
        />

        <Pin className="cursor-pointer" size={32} />
      </div>
      {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Input
            name="filename"
            value={
              formState.files.find((file) => file.id === selectedFileId)
                ?.name || ""
            }
            placeholder="filename.ts"
            onChange={(e) => handleChangeFileName(e)}
            className="w-max"
          />
          {formState.files.length > 1 && (
            <Trash2Icon
              className="cursor-pointer"
              size={18}
              color="#ef4444"
              onClick={handleDeleteFile}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h3>
              {formState.files.length > 0
                ? `${formState.files.length} file${
                    formState.files.length > 1 ? "s" : ""
                  }`
                : ""}
            </h3>

            <FileSelector
              formState={formState}
              selectedFileId={selectedFileId}
              onChange={(value: string) => handleFileSelect(value)}
            />
          </div>
          <Button type="button" onClick={handleAddNewFile}>
            +
          </Button>
        </div>
      </div>

      <CreateCodeContainer
        value={
          formState.files.find((file) => file.id === selectedFileId)?.code || ""
        }
        handleOnChange={(value: string | undefined) =>
          handleChangeFileContent(value)
        }
        selectedFileName={
          formState.files.find((file) => file.id === selectedFileId)?.name || ""
        }
      />
    </form>
  );
}

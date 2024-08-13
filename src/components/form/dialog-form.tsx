"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pin, Trash2Icon } from "lucide-react";
import {
  randomFileNamesWithExtension,
  handleFileContentChange,
} from "../editor/editor_utils";
import { useState } from "react";
import { GistData } from "@/lib/types/gist";
import { v4 as uuidv4 } from "uuid";
import CreateCodeContainer from "../editor/CreateCodeContainer";
import { PrivateSwitch } from "../editor/PrivateSwitch";
import { SelectCodeContainerStyle } from "../editor/SelectCodeContainerStyle";
import FileSelector from "../filters/file-selector";

const defaultNewFile = {
  id: uuidv4(),
  filename:
    randomFileNamesWithExtension[
      Math.floor(Math.random() * randomFileNamesWithExtension.length)
    ],
  content: "",
  type: "text/code",
  language: "Code",
};

export function DialogForm({ parentProps, isEditing }: any) {
  const [gistData, setGistData] = useState<GistData>(
    isEditing
      ? (parentProps as GistData)
      : {
          id: "",
          description: "",
          public: false,
          files: [defaultNewFile],
        }
  );

  const [selectedFileId, setSelectedFileId] = useState<string | null>(
    gistData.files.length > 0 ? gistData.files[0].id : null
  );

  const handleChangeFileContent = (value: string | undefined) => {
    handleFileContentChange(selectedFileId, value || "", gistData, setGistData);
  };

  const handleFileSelect = (value: string | undefined) => {
    console.log("value", value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">New snippet</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50%] hide-close-btn max-h-[90%]">
        <DialogHeader className="w-12/12 mt-0">
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Title"
              className="border-0 focus-visible:ring-0 placeholder:text-xl text-xl"
              ctnClassName="w-full"
            />
            <Pin className="cursor-pointer" size={32} />
          </div>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Input placeholder="filename.ts" className="w-max" />
              <Trash2Icon
                className="cursor-pointer"
                size={18}
                color="#ef4444"
              ></Trash2Icon>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <h3>
                  {gistData.files.length === 1
                    ? `${gistData.files.length} file`
                    : gistData.files.length > 1
                    ? `${gistData.files.length} files`
                    : ""}
                </h3>
                <FileSelector
                  gistData={gistData}
                  selectedFileId={selectedFileId}
                  onChange={(value) => handleFileSelect(value)}
                />
              </div>
              <Button>+</Button>
            </div>
          </div>

          <CreateCodeContainer
            value={
              gistData.files.find((file) => file.id === selectedFileId)
                ?.content || ""
            }
            handleOnChange={(value: string | undefined) =>
              handleChangeFileContent(value)
            }
            selectedFileName={
              gistData.files.find((file) => file.id === selectedFileId)
                ?.filename || ""
            }
          />
        </div>
        <div className="mt-4">
          <PrivateSwitch
            text="Private 🕵️‍♂️"
            className="flex-row-reverse gap-2"
            labelClassName="font-light"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

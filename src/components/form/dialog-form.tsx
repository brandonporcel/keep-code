"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pin } from "lucide-react";
import {
  randomFileNamesWithExtension,
  handleFileContentChange,
} from "../editor/editor_utils";
import { useState } from "react";
import { GistData } from "@/lib/types/gist";
import { v4 as uuidv4 } from "uuid";
import CreateCodeContainer from "../editor/CreateCodeContainer";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">New snippet</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[75%] hide-close-btn">
        <DialogHeader className="w-12/12 mt-4">
          <div className="flex items-center justify-between gap-4">
            <Input placeholder="Title" />
            <Pin />
          </div>
        </DialogHeader>
        <div>
          <CreateCodeContainer
            value={""}
            handleOnChange={(value: string | undefined) =>
              handleChangeFileContent(value)
            }
            selectedFileName={
              gistData.files.find((file) => file.id === selectedFileId)
                ?.filename || ""
            }
          />
          <h1>hola</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}

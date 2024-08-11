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
import Tiptap from "../tiptap";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  handleFileTypeChange,
  tabsValue,
  randomFileNamesWithExtension,
  handleFileContentChange,
} from "../editor/editor_utils";
import { useState } from "react";
import { Tab } from "@/lib/zist";
import { GistData } from "@/lib/types/gist";
import { v4 as uuidv4 } from "uuid";
import TabsContentWrapper from "../ui/tabs-content-wrapper";
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
  const check = (val: any) => {};
  const isMarkdownType =
    isEditing && parentProps?.files[0].language === "Markdown";
  const [currentActiveTab, setCurrentActiveTab] = useState<Tab>(
    isMarkdownType ? tabsValue.MARKDOWN : tabsValue.CODE
  );
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
  const [remountKey, setRemountKey] = useState(1);

  const [selectedFileId, setSelectedFileId] = useState<string | null>(
    gistData.files.length > 0 ? gistData.files[0].id : null
    // gistData.files.length > 0 ? gistData.files[0].id : null
  );
  const handleTabChange = (value: Tab) => {
    setCurrentActiveTab(value);
    handleFileTypeChange(selectedFileId, value.key, gistData, setGistData);
  };
  const handleChangeFilecContentMD = (value: string) => {
    handleFileContentChange(selectedFileId, value, gistData, setGistData);
  };
  const handleChangeFileContent = (value: string | undefined) => {
    handleFileContentChange(selectedFileId, value || "", gistData, setGistData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">New snippet</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[75%]">
        <DialogHeader className="w-12/12 mt-4">
          <div className="flex items-center justify-between gap-4">
            <Input placeholder="Title" />
            <Pin />
          </div>
        </DialogHeader>
        <div>
          <Tabs
            defaultValue={tabsValue.CODE.value}
            value={currentActiveTab.value}
          >
            <TabsList className="grid md:w-[214px] grid-cols-2 gap-2 mb-2 w-full">
              <TabsTrigger
                onClick={() => handleTabChange(tabsValue.MARKDOWN)}
                value={tabsValue.MARKDOWN.value}
              >
                Markdown
              </TabsTrigger>
              <TabsTrigger
                onClick={() => handleTabChange(tabsValue.CODE)}
                value={tabsValue.CODE.value}
              >
                Code
              </TabsTrigger>
            </TabsList>

            <TabsContentWrapper
              visible={currentActiveTab.key === tabsValue.MARKDOWN.key}
              mount={currentActiveTab.key === tabsValue.MARKDOWN.key}
              value={tabsValue.MARKDOWN.value}
              key={remountKey}
            >
              <Tiptap
                content={
                  gistData.files.find((file) => file.id === selectedFileId)
                    ?.content || ""
                }
                onChange={(value: string) => handleChangeFilecContentMD(value)}
              />
            </TabsContentWrapper>
          </Tabs>
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
          {/* <Tiptap
            content={"console.log(232)"}
            onChange={(value: string) => check(value)}
          /> */}
          <h1>hola</h1>
        </div>
      </DialogContent>
    </Dialog>
  );
}

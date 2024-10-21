"use client";
import React, { useState } from "react";
import { Editor, OnChange } from "@monaco-editor/react";
import { defaultFontMapper, displayFontMapper } from "@/app/styles/fonts";
import { cn } from "@/lib/utils";
import { extensionToLanguage } from "@/lib/constants/language";
import { SnippetStyle } from "@/lib/enums/snippet-style.enum";

type CreateCodeContainerProps = {
  handleOnChange: OnChange;
  value: string;
  selectedFileName?: string;
};

const options = {
  minimap: { enabled: false },
  lineNumbers: "off" as const,
  scrollbar: {
    useShadows: false,
    verticalHasArrows: true,
    horizontalHasArrows: true,
    verticalScrollbarSize: 0,
    horizontalScrollbarSize: 17,
    alwaysConsumeMouseWheel: false,
  },
};

const CreateCodeContainer = ({
  handleOnChange,
  value,
  selectedFileName,
}: CreateCodeContainerProps) => {
  function setEditorTheme(monaco: any) {
    monaco.editor.defineTheme("onedark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "comment",
          foreground: "#5d7988",
          fontStyle: "italic",
        },
        { token: "constant", foreground: "#e06c75" },
      ],
      colors: {
        "editor.background": "#0a0a0acc",
      },
    });
  }

  const languageExtension = selectedFileName?.split(".")[1] || "js";
  const language = extensionToLanguage[languageExtension];

  const [containerStyle, setContainerStyle] = useState<number>(
    SnippetStyle.Default
  );
  const onChangeContainerStyle = (v: string | undefined) => {
    if (!v) {
      setContainerStyle(SnippetStyle.Default);
      return;
    }

    setContainerStyle(+v);
  };

  return (
    <div>
      <Editor
        options={options}
        language={language}
        value={value}
        beforeMount={setEditorTheme}
        theme="onedark"
        defaultLanguage="javascript"
        defaultValue="// Hello"
        onChange={handleOnChange}
        className={
          (cn(displayFontMapper.Default, defaultFontMapper.Default),
          "bg-[#0A0B0B] border solid rounded-sm relative min-h-[400px] w-full shadow-lg p-4 bg-")
        }
      />
    </div>
  );
};

export default CreateCodeContainer;

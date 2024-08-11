import { GistData } from "@/lib/types/gist";

export const randomFileNamesWithExtension = [
  "random.js",
  "random.ts",
  "random.py",
  "random.java",
  "random.c",
  "random.cpp",
  "random.go",
  "random.rb",
  "random.php",
  "random.html",
  "random.css",
  "random.md",
];

export const tabsValue: any = {
  MARKDOWN: {
    key: "text/markdown",
    value: "Markdown",
  },
  CODE: {
    key: "text/code",
    value: "Code",
  },
};

export const handleFileTypeChange = (
  fileId: string | null,
  type: string,
  gistData: GistData,
  setGistData: React.Dispatch<React.SetStateAction<GistData>>
) => {
  const updatedFiles = gistData.files.map((file) =>
    file.id === fileId
      ? {
          ...file,
          type: type,
          language: type === "text/markdown" ? "Markdown" : "Code",
        }
      : file
  );

  setGistData({
    ...gistData,
    files: updatedFiles,
  });
};

export const handleFileContentChange = (
  fileId: string | null,
  value: string,
  gistData: GistData,
  setGistData: React.Dispatch<React.SetStateAction<GistData>>
) => {
  const updatedFiles = gistData.files.map((file) =>
    file.id === fileId ? { ...file, content: value } : file
  );

  setGistData({
    ...gistData,
    files: updatedFiles,
  });
};

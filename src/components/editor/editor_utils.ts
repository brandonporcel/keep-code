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

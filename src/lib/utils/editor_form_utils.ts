import { Snippet } from "../types/snippet";

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

export const addNewFile = (
  formState: Snippet,
  setFormState: React.Dispatch<React.SetStateAction<Snippet>>,
  setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const newFileId = crypto.randomUUID();
  setFormState({
    ...formState,
    files: [
      ...formState.files,
      {
        id: newFileId,
        name: randomFileNamesWithExtension[
          Math.floor(Math.random() * randomFileNamesWithExtension.length)
        ],
        code: "",
      },
    ],
  });
  setSelectedFileId(newFileId);
};

export const removeFile = (
  selectedFileId: string | null,
  formState: Snippet,
  setFormState: React.Dispatch<React.SetStateAction<Snippet>>,
  setSelectedFileId: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const updatedFiles = formState.files.filter(
    (file) => file.id !== selectedFileId
  );

  setFormState({
    ...formState,
    files: updatedFiles,
  });

  const id = updatedFiles.length > 0 ? updatedFiles[0].id : "";
  setSelectedFileId(id);
};

export const handleFileNameChange = (
  selectedFileId: string | null,
  value: string,
  formState: Snippet,
  setFormState: React.Dispatch<React.SetStateAction<Snippet>>
) => {
  const updatedFiles = formState.files.map((file) =>
    file.id === selectedFileId ? { ...file, name: value } : file
  );
  setFormState({
    ...formState,
    files: updatedFiles,
  });
};

export const handleFileContentChange = (
  selectedFileId: string | null,
  value: string,
  formData: Snippet,
  setFormData: React.Dispatch<React.SetStateAction<Snippet>>
) => {
  const updatedFiles = formData.files.map((file) =>
    file.id === selectedFileId ? { ...file, code: value } : file
  );

  setFormData({
    ...formData,
    files: updatedFiles,
  });
};

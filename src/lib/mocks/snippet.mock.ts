import { Snippet } from "../types/snippet";
import { randomFileNamesWithExtension } from "../utils/editor_form_utils";

export const getDefaultNewFile = (id: string) => {
  return {
    id: crypto.randomUUID(),
    name: randomFileNamesWithExtension[
      Math.floor(Math.random() * randomFileNamesWithExtension.length)
    ],
    code: "",
    index: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    snippetId: id,
  };
};

export const getSnippetFormStateDefault = (id: string): Snippet => {
  return {
    id,
    title: "",
    private: true,
    files: [getDefaultNewFile(id)],
  };
};

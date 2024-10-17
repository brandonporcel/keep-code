import { Snippet, SnippetFile } from "../types/snippet";
import { randomFileNamesWithExtension } from "../utils/editor_form_utils";

export const defaultNewFile: SnippetFile = {
  id: crypto.randomUUID(),
  name: randomFileNamesWithExtension[
    Math.floor(Math.random() * randomFileNamesWithExtension.length)
  ],
  code: "",
  index: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  snippetId: "f945ba55-c1db-497c-a180-086028572837",
};

export const snippetFormStateDefault: Snippet = {
  id: "f945ba55-c1db-497c-a180-086028572837",
  title: "",
  private: true,
  files: [defaultNewFile],
};

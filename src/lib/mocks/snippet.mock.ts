import { Snippet } from "../types/snippet";
import { randomFileNamesWithExtension } from "../utils/editor_form_utils";

export const defaultNewFile = {
  id: crypto.randomUUID(),
  name: randomFileNamesWithExtension[
    Math.floor(Math.random() * randomFileNamesWithExtension.length)
  ],
  code: "",
};

export const snippetFormStateDefault: Snippet = {
  id: "",
  title: "",
  private: true,
  files: [defaultNewFile],
};

import { randomFileNamesWithExtension } from "@/components/editor/editor_utils";
import { v4 as uuidv4 } from "uuid";
import { GistData } from "../types/gist";

export const defaultNewFile = {
  id: uuidv4(),
  filename:
    randomFileNamesWithExtension[
      Math.floor(Math.random() * randomFileNamesWithExtension.length)
    ],
  content: "",
  type: "text/code",
  language: "Code",
};

export const gistDataDefault: GistData = {
  id: "",
  description: "",
  public: false,
  files: [defaultNewFile],
};

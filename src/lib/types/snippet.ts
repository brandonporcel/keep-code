export type File = {
  id: string;
  name: string;
  code: string;
};

export type Snippet = {
  id: string;
  title: string;
  private: boolean;
  files: File[];
};

export type SnippetHardcode = {
  title: string;
  filename: string;
  code: string;
};

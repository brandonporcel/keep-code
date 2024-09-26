export type SnippetFile = {
  id: string;
  name: string;
  code: string;
};

export type Snippet = {
  id: string;
  title: string;
  private: boolean;
  files: SnippetFile[];
};

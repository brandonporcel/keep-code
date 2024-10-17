export type SnippetFile = {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  index: number;
  snippetId: string;
};

export type Snippet = {
  id: string;
  title: string;
  private: boolean;
  files: SnippetFile[];
};

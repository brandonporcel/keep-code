"use server";

import prisma from "@/lib/db";
import { Snippet } from "@/lib/types/snippet";

type SaveSnippetProps = {
  snippet: Snippet;
};

export async function saveSnippet({ snippet }: SaveSnippetProps) {
  // await prisma.snippet.deleteMany();
  await prisma.snippet.create({
    data: {
      title: snippet.title,
      userId: "4fe40d44-54ba-4325-9b37-b27771cdeb7a",
      files: {
        createMany: {
          data: snippet.files.map((snipp, i) => ({
            code: snipp.code ?? "-",
            index: i,
            name: snipp.name,
          })),
        },
      },
    },
  });
}

export async function getSnippets(): Promise<Snippet[]> {
  return await prisma.snippet.findMany({
    include: {
      files: true,
    },
  });
}

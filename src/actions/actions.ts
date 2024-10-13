"use server";
import prisma from "@/lib/db";
import { Snippet } from "@/lib/types/snippet";

interface SaveSnippetProps {
  snippet: Snippet;
}

interface EditSnippetProps extends SaveSnippetProps {}

export async function saveSnippet({ snippet }: SaveSnippetProps) {
  console.log("snippet.id", snippet.id);
  return await prisma.snippet.create({
    data: {
      title: snippet.title,
      userId: "4fe40d44-54ba-4325-9b37-b27771cdeb7a",
      files: {
        createMany: {
          data: snippet.files.map((snipp, i) => ({
            code: snipp.code,
            index: i,
            name: snipp.name,
          })),
        },
      },
    },
    include: {
      files: true,
    },
  });
}

export async function updateSnippet({ snippet }: EditSnippetProps) {
  await prisma.snippet.update({
    where: { id: snippet.id },
    data: {
      title: snippet.title,
      private: snippet.private,
      files: {
        update: snippet.files.map((file) => ({
          where: { id: file.id },
          data: {
            name: file.name,
            code: file.code,
          },
        })),
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

export async function deleteSnippets(snippets: Snippet[]) {
  return await prisma.snippet.deleteMany({
    where: {
      id: { in: snippets.map((el) => el.id) },
    },
  });
}

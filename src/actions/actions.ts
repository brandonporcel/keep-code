"use server";
import prisma from "@/lib/db";
import { Snippet } from "@/lib/types/snippet";
import { SnippetFile } from "@prisma/client";

interface SaveSnippetProps {
  snippet: Snippet;
}

interface EditSnippetProps extends SaveSnippetProps {
  updatedExistingFiles: SnippetFile[];
  updatedNewExistingFiles: SnippetFile[];
}

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

export async function updateSnippet({
  snippet,
  updatedExistingFiles,
  updatedNewExistingFiles,
}: EditSnippetProps) {
  const updatePromises = updatedExistingFiles.map((file) => {
    return prisma.snippetFile.update({
      where: { id: file.id },
      data: {
        name: file.name,
        code: file.code,
      },
    });
  });

  const createPromises = updatedNewExistingFiles.map((file) => {
    return prisma.snippetFile.create({
      data: {
        name: file.name,
        code: file.code,
        index: file.index,
        snippetId: snippet.id,
      },
    });
  });

  await Promise.all([...updatePromises, ...createPromises]);

  await prisma.snippet.update({
    where: { id: snippet.id },
    data: {
      title: snippet.title,
      private: snippet.private,
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

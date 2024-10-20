"use server";
import { auth } from "@clerk/nextjs/server";
import { SnippetFile } from "@prisma/client";
import prisma from "@/lib/db";
import { Snippet } from "@/lib/types/snippet";

interface SaveSnippetProps {
  snippet: Snippet;
}

interface EditSnippetProps extends SaveSnippetProps {
  updatedExistingFiles: SnippetFile[];
  updatedNewFiles: SnippetFile[];
}

export async function saveSnippet({ snippet }: SaveSnippetProps) {
  const { userId } = auth();
  if (!userId) return new Error("User not found");

  return await prisma.snippet.create({
    data: {
      id: snippet.id,
      title: snippet.title,
      userId,
      files: {
        createMany: {
          data: snippet.files.map((snipp, i) => ({
            id: snipp.id,
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
  updatedNewFiles,
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

  const createPromises = updatedNewFiles.map((file) => {
    return prisma.snippetFile.create({
      data: {
        id: file.id,
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

export async function getSnippets() {
  const { userId } = auth();
  if (!userId) return [];

  return await prisma.snippet.findMany({
    where: { userId },
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

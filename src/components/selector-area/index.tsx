"use client";
import { useEffect, useState } from "react";
import Selecto from "react-selecto";
import { MasonryLayout } from "../masonry";
import { deleteSnippets, getSnippets, saveSnippet } from "@/actions/actions";
import { useSnippetContext } from "@/app/contexts/SnippetContext";
import { Snippet } from "@/lib/types/snippet";

export default function SelectorArea() {
  const {
    snippets,
    setSnippets,
    setIsLoading,
    selectedTargets,
    setSelectedTargets,
  } = useSnippetContext();
  const [lastDeletedSnippets, setLastDeletedSnippets] = useState<
    Snippet[] | null
  >(null);

  useEffect(() => {
    const getAllSnippets = async () => {
      setIsLoading(true);
      const res = await getSnippets();
      setSnippets(res);
      setIsLoading(false);
    };
    getAllSnippets();
  }, [setSnippets, setIsLoading]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      try {
        if (event.key === "Delete" && selectedTargets.length > 0) {
          const selectedIds = selectedTargets.map((target) => target.id);
          const snippetsToDelete = snippets.filter((snippet) =>
            selectedIds.includes(snippet.id)
          );

          setLastDeletedSnippets(snippetsToDelete);
          setSnippets((prevSnippets) =>
            prevSnippets.filter((snippet) => !selectedIds.includes(snippet.id))
          );

          await deleteSnippets(snippetsToDelete);
        }

        if (event.ctrlKey && event.key === "z" && lastDeletedSnippets) {
          const restoredSnippets = await Promise.all(
            lastDeletedSnippets.map(async (snippet) => {
              const savedSnippet = await saveSnippet({ snippet });
              return savedSnippet instanceof Error ? null : savedSnippet;
            })
          );

          const validRestoredSnippets = restoredSnippets.filter(
            (snippet) => snippet !== null
          );

          setSnippets((prevSnippets) => [
            ...prevSnippets,
            ...validRestoredSnippets,
          ]);
          setLastDeletedSnippets(null);
        }
      } catch (error) {
        console.error("Error al manejar el evento de teclado:", error);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTargets, snippets, lastDeletedSnippets, setSnippets]);

  return (
    <div className="container">
      <Selecto
        dragContainer={".wrapper-of-all"}
        selectableTargets={[".wrapper-of-all .cube"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        onSelectEnd={(e) => {
          const selectedElements = e.selected;
          setSelectedTargets(selectedElements);
        }}
      />
      <div className="p-4 min-h-screen">
        <MasonryLayout
          snippets={snippets}
          selectedTargets={selectedTargets.map((el) => el.id)}
        />
      </div>
    </div>
  );
}

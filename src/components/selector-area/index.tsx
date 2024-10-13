"use client";
import { useEffect, useState } from "react";
import Selecto from "react-selecto";
import { MasonryLayout } from "../masonry";
import { getSnippets } from "@/actions/actions";
import { Snippet } from "@/lib/types/snippet";

export default function SelectorArea() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [selectedTargets, setSelectedTargets] = useState<Element[]>([]);

  useEffect(() => {
    const updateMonkeyCount = async () => {
      const res = await getSnippets();
      setSnippets(res);
    };
    updateMonkeyCount();
  }, []);

  return (
    <div className="container">
      <Selecto
        dragContainer={".elements"}
        selectableTargets={[".selecto-area .cube"]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={["shift"]}
        onDragStart={(e) => {
          const target = e.inputEvent.target;
          if (selectedTargets.some((t) => t === target || t.contains(target))) {
            e.stop();
          }
        }}
        onSelectEnd={(e) => {
          const selectedElements = e.selected;
          setSelectedTargets(selectedElements);
        }}
      />
      <div className="elements selecto-area p-4 min-h-screen">
        <MasonryLayout
          snippets={snippets}
          selectedTargets={selectedTargets.map((el) => el.id)}
        />
      </div>
    </div>
  );
}

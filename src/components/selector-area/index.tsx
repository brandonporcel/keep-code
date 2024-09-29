"use client";
import { useEffect, useRef, useState } from "react";
import Selecto from "react-selecto";
import { MasonryLayout } from "../masonry";
import { getSnippets } from "@/actions/actions";
import { Snippet } from "@/lib/types/snippet";

export default function SelectorArea() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  const [selectedTargets, setSelectedTargets] = useState<
    (HTMLElement | SVGElement | Element)[]
  >([]);

  // Datos de los cubos
  const cubes = [
    { id: 1, description: "hola que tal" },
    { id: 2, description: "segundo cubo" },
    { id: 3, description: "tercer cubo" },
    { id: 4, description: "cuarto cubo" },
    { id: 5, description: "quinto cubo" },
  ];

  useEffect(() => {}, [selectedTargets]);

  useEffect(() => {
    const updateMonkeyCount = async () => {
      const res = await getSnippets();
      console.log("res", res);
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
      <div className="elements selecto-area bg-red-800 p-4">
        <MasonryLayout
          snippets={snippets}
          selectedTargets={selectedTargets.map((el) => el.id)}
        />
      </div>
      {/* <div className="elements selecto-area bg-red-800 p-4 flex">
        {cubes.map((cube, index) => (
          <div
            className={`cube h-9 w-9 m-2 bg-white ${
              selectedTargets.includes(
                document.querySelectorAll(".cube")[index]
              )
                ? "border-2 border-blue-500"
                : ""
            }`}
            key={cube.id}
          >
            {cube.description}
          </div>
        ))}
      </div> */}
    </div>
  );
}

"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { Masonry } from "./Masonry";
import { range } from "./range";
import { getSnippets } from "@/actions/actions";
import { Snippet } from "@/lib/types/snippet";
import { cn } from "@/lib/utils";

const initialItems = range(10).map((id) => ({
  id: id + 1,
  height: 100 + Math.random() * 400,
}));

type Item = (typeof initialItems)[number];

type MasonryLayoutProps = {
  // selectedTargets: (HTMLElement | SVGElement | Element)[];
  selectedTargets: any[];
  snippets: Snippet[];
};
export function MasonryLayout({
  snippets,
  selectedTargets,
}: MasonryLayoutProps) {
  const [items, setItems] = useState(initialItems);
  console.log("selectedTargets", selectedTargets);
  // console.log(
  //   "selectedTargets 2",
  //   selectedTargets.map((el) => el.id)
  // );
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            setItems((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id);
              const newIndex = items.findIndex((item) => item.id === over.id);
              return arraySwap(items, oldIndex, newIndex);
            });
          }
        }}
      >
        <div className="p-4 overflow-clip">
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            <Masonry
              items={items}
              itemKey={(item) => item.id}
              columnWidth={300}
              gap={8}
              renderItem={(item: any, index: any) => {
                return (
                  <>
                    <Cell
                      item={item}
                      snippet={snippets[index]}
                      selectedTargets={selectedTargets}
                    />
                  </>
                );
              }}
            />
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
}

function Cell({
  item,
  snippet,
  selectedTargets,
}: {
  item: Item;
  snippet: Snippet;
  // selectedTargets: (HTMLElement | SVGElement | Element)[];
  selectedTargets: any[];
}) {
  // console.log("HIJO item", item);
  // console.log("HIJO snippet", snippet);
  // console.log("HIJO selectedTargets", selectedTargets);
  const sortable = useSortable({
    id: item.id,
    animateLayoutChanges: (args) => {
      return !args.wasDragging;
    },
  });

  const getPlaceholderHeight = () => {
    if (sortable.isOver && sortable.active) {
      return sortable.active.rect.current.initial?.height;
    }

    if (sortable.isDragging && sortable.over) {
      return sortable.over.rect.height;
    }

    return item.height;
  };

  return (
    <div
      style={{ height: getPlaceholderHeight(), transition: "0.2s height" }}
      // className={"border-2 border-blue-500"}
      className={
        selectedTargets.find((el) => el === item.id + "")
          ? "border-2 border-blue-500"
          : ""
      }
    >
      {/* {selectedTargets.map((el, i) => {
        return <p key={i}>{JSON.stringify(el)}</p>;
      })} */}

      <div
        ref={sortable.setNodeRef}
        style={{
          height: item.height,
          transform: CSS.Translate.toString(sortable.transform),
          transition: sortable.transition,
        }}
        {...sortable.attributes}
        {...sortable.listeners}
        className={`bg-muted p-4 rounded-md overflow-x-auto cube`}
        id={item.id + ""}
        // data-coso={item.id + "q"}
        // data-idd={item.id + "q"}
      >
        {snippet ? (
          <>
            <div className="font-bold text-lg">{snippet.title}</div>
            <pre className="mt-2">
              <code>{snippet.files[0].code}</code>
            </pre>
          </>
        ) : (
          <div className="text-center">Loading snippet...</div>
        )}
      </div>
    </div>
  );
}

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
import { Snippet } from "@/lib/types/snippet";
import { DialogFormOpener } from "../form/dialog-form";

type MasonryLayoutProps = {
  selectedTargets: string[];
  snippets: Snippet[];
};
export function MasonryLayout({
  snippets,
  selectedTargets,
}: MasonryLayoutProps) {
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>(snippets);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalSnippets(snippets);
  }, [snippets]);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (over && active.id !== over.id) {
            setLocalSnippets((items) => {
              const oldIndex = items.findIndex((item) => item.id === active.id);
              const newIndex = items.findIndex((item) => item.id === over.id);
              return arraySwap(items, oldIndex, newIndex);
            });
          }
        }}
      >
        <div className="p-4 overflow-clip">
          <SortableContext
            items={localSnippets}
            strategy={rectSwappingStrategy}
          >
            <Masonry
              items={localSnippets}
              itemKey={(item) => item.id}
              columnWidth={300}
              gap={8}
              renderItem={(item: any) => {
                return (
                  <Cell snippet={item} selectedTargets={selectedTargets} />
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
  snippet,
  selectedTargets,
}: {
  snippet: Snippet;
  selectedTargets: string[];
}) {
  const [toEdit, setToEdit] = useState(false);

  const sortable = useSortable({
    id: snippet.id,
    animateLayoutChanges: (args) => {
      return !args.wasDragging;
    },
  });

  const openEditModal = () => {
    setToEdit(true);
  };

  const closeEditModal = () => {
    setToEdit(false);
  };

  return (
    <>
      {toEdit && (
        <DialogFormOpener snippet={snippet} onClose={closeEditModal} />
      )}

      <div
        onClick={openEditModal}
        style={{ transition: "0.2s height" }}
        className={
          selectedTargets.includes(snippet.id) ? "border-2 border-blue-500" : ""
        }
      >
        <div
          ref={sortable.setNodeRef}
          style={{
            transform: CSS.Translate.toString(sortable.transform),
            transition: sortable.transition,
          }}
          {...sortable.attributes}
          {...sortable.listeners}
          className={`bg-muted p-4 rounded-md cube`}
          id={snippet.id}
        >
          <div className="font-bold text-lg">{snippet.title}</div>
          {snippet.files.length > 0 && (
            <pre className="mt-2">
              <code>{snippet.files[0].code}</code>
            </pre>
          )}
        </div>
      </div>
    </>
  );
}

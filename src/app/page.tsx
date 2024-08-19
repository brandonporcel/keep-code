/* eslint-disable @next/next/no-img-element */
"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { DialogForm } from "@/components/form/dialog-form";
import { useState } from "react";
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { MasonryLayout } from "@/components/masonry";

export default function Home() {
  return (
    <div className="flex">
      <span className="min-w-20" />
      <Sidebar />
      <div className="w-full">
        <div className="my-8 mb-4 mx-auto w-[600px]">
          <DialogForm />
        </div>
        <div className="mt-16">
          <MasonryLayout />
        </div>
      </div>
    </div>
  );
}

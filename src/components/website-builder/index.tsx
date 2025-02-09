"use client";

import { DndContext } from "@dnd-kit/core";
import { type Website } from "@/lib/types";
import { ComponentList } from "./component-list";
import { Canvas } from "./canvas";
import { PropertyPanel } from "./property-panel";

interface WebsiteBuilderProps {
  website: Website;
}

export function WebsiteBuilder({ website }: WebsiteBuilderProps) {
  return (
    <DndContext>
      <div className="grid h-screen grid-cols-[250px_1fr_300px]">
        <ComponentList />
        <Canvas website={website} />
        <PropertyPanel />
      </div>
    </DndContext>
  );
}

"use client";

import { useDraggable } from "@dnd-kit/core";
import { components } from "./components";

export function ComponentList() {
  return (
    <div className="border-r p-4">
      <h2 className="mb-4 font-semibold">Components</h2>
      <div className="space-y-2">
        {Object.entries(components).map(([id, component]) => (
          <DraggableComponent key={id} id={id} component={component} />
        ))}
      </div>
    </div>
  );
}

function DraggableComponent({ id, component }: { id: string; component: any }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `component-${id}`,
    data: {
      type: "component",
      component,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-move rounded border bg-white p-2 shadow-sm hover:bg-gray-50"
    >
      {component.label}
    </div>
  );
}

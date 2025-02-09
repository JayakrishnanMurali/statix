"use client";

import { useDroppable } from "@dnd-kit/core";
import { type Website } from "@/lib/types";
import { motion } from "framer-motion";
import { useWebsiteStore } from "@/lib/stores/website-store";

interface CanvasProps {
  website: Website;
}

export function Canvas({ website }: CanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "canvas",
  });
  const components = useWebsiteStore((state) => state.components);

  return (
    <div
      ref={setNodeRef}
      className={`h-full overflow-auto bg-gray-100 p-4 ${
        isOver ? "bg-gray-200" : ""
      }`}
    >
      <div className="mx-auto min-h-full w-full max-w-3xl rounded-lg bg-white p-8 shadow">
        {components.map((component) => (
          <motion.div
            key={component.id}
            initial={component.animation?.type ? "initial" : false}
            animate={component.animation?.type ? "animate" : false}
            transition={{
              duration: component.animation?.duration ?? 0.3,
              delay: component.animation?.delay ?? 0,
            }}
            className="mb-4"
          >
            <ComponentRenderer component={component} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ComponentRenderer({ component }: { component: any }) {
  switch (component.type) {
    case "text":
      return <p style={component.config.style}>{component.config.content}</p>;
    case "image":
      return (
        <img
          src={component.config.src}
          alt={component.config.alt}
          style={component.config.style}
        />
      );
    case "button":
      return (
        <button style={component.config.style}>
          {component.config.content}
        </button>
      );
    default:
      return null;
  }
}

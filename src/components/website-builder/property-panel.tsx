"use client";

import { useWebsiteStore } from "@/lib/stores/website-store";
import { animations } from "@/lib/animations";

export function PropertyPanel() {
  const selectedComponent = useWebsiteStore((state) => state.selectedComponent);
  const updateComponent = useWebsiteStore((state) => state.updateComponent);

  if (!selectedComponent) {
    return (
      <div className="border-l p-4">
        <p className="text-muted-foreground">Select a component to edit</p>
      </div>
    );
  }

  return (
    <div className="border-l p-4">
      <h2 className="mb-4 font-semibold">Properties</h2>

      {/* Content */}
      {selectedComponent.config.content !== undefined && (
        <div className="mb-4">
          <label className="mb-1 block text-sm">Content</label>
          <input
            type="text"
            value={selectedComponent.config.content}
            onChange={(e) =>
              updateComponent(selectedComponent.id, {
                ...selectedComponent,
                config: {
                  ...selectedComponent.config,
                  content: e.target.value,
                },
              })
            }
            className="w-full rounded border p-1"
          />
        </div>
      )}

      {/* Animation */}
      <div className="mb-4">
        <label className="mb-1 block text-sm">Animation</label>
        <select
          value={selectedComponent.animation?.type ?? ""}
          onChange={(e) =>
            updateComponent(selectedComponent.id, {
              ...selectedComponent,
              animation: {
                ...selectedComponent.animation,
                type: e.target.value,
              },
            })
          }
          className="w-full rounded border p-1"
        >
          <option value="">None</option>
          {Object.keys(animations).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

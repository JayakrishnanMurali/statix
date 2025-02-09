import { create } from "zustand";
import { type Component } from "@/lib/types";

interface WebsiteState {
  components: Component[];
  selectedComponent: Component | null;
  addComponent: (component: Component) => void;
  updateComponent: (id: string, component: Component) => void;
  selectComponent: (component: Component | null) => void;
}

export const useWebsiteStore = create<WebsiteState>((set) => ({
  components: [],
  selectedComponent: null,
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
    })),
  updateComponent: (id, component) =>
    set((state) => ({
      components: state.components.map((c) => (c.id === id ? component : c)),
    })),
  selectComponent: (component) => set({ selectedComponent: component }),
}));

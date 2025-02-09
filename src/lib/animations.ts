import { type Variants } from "framer-motion";

export const animations: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideIn: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  },
  zoomIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  },
};

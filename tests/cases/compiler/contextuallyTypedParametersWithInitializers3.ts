// @strict: true
// @noEmit: true

type CanvasDirection = "RIGHT" | "LEFT";

interface GraphActions {
  setDirection: (direction: CanvasDirection) => void;
}

export declare function create<T>(config: T): void;

create<GraphActions>({
  setDirection: (direction = "RIGHT") => {
    direction; // CanvasDirection
  },
});
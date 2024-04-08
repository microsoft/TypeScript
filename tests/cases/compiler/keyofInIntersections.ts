// @strict: true
// @noEmit: true

type Foo = { x: string } | undefined;
type Bar = { y: string };

type Keys1<T, U> = keyof (T & U);
type Keys2<T, U> = keyof T | keyof U;

type K1 = keyof Foo;  // never
type K2 = keyof Bar;  // "y"
type K3 = keyof (Foo & Bar);  // "x" | "y"
type K4 = keyof Foo | keyof Bar;  // "y"
type K5 = Keys1<Foo, Bar>;  // "x" | "y"
type K6 = Keys2<Foo, Bar>;  // "y"

// Repro from #51331

type GestureKey = "drag";
type DragState = { movement: [number, number]; };

interface State {
    drag?: DragState;
}

type SharedGestureState = {
    dragging?: boolean;
};

type FullGestureState<Key extends GestureKey> = SharedGestureState & NonNullable<State[Key]>;

type Handler<Key extends GestureKey> = (state: Omit<FullGestureState<Key>, "event">) => void;

const f1 = (state: Omit<FullGestureState<"drag">, "event">) => {
  state;
  state.movement;
};

const f2: Handler<"drag"> = (state) => {
  state;
  state.movement;
};

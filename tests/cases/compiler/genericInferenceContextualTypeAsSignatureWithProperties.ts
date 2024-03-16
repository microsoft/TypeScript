// @strict: true
// @noEmit: true

// repro from #52262

const inner = <T extends 'a' | 'b' | 'c'>(cb: (arg: T) => void) => {};

interface FuncB<T> {
  (arg: T): void;
  x?: string;
};
const outerB = <T,>(func: FuncB<T>, arg: T) => {};
outerB(inner, (arg: 'a' | 'b') => {});

interface FuncC<T> {
  (arg: T): void;
  x?: T;
};
const outerC = <T,>(func: FuncC<T>, arg: T) => {};
outerC(inner, (arg: 'a' | 'b') => {}); // error

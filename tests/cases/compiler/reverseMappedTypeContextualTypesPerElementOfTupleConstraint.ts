// @strict: true
// @noEmit: true

type Tuple<T> = readonly [T, ...T[]];

declare function bindAll<
  TTarget extends EventTarget,
  TTypes extends Tuple<keyof TTarget & `on${any}`>
>(
  target: TTarget,
  bindings: {
    [K in keyof TTypes]: {
      type: TTypes[K];
      listener: (
        ev: Parameters<Extract<TTarget[TTypes[K]], (...args: any[]) => any>>[0]
      ) => void;
    };
  }
): void;

bindAll({} as HTMLButtonElement, [
  {
    type: "onclick",
    listener: (event) => {},
  },
  {
    type: "onkeydown",
    listener: (event) => {},
  },
]);

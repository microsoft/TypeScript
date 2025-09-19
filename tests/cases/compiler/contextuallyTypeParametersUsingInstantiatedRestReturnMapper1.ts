// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62336

declare function call<T>(fn: (a: string, b: T) => unknown): (b: T) => unknown;

declare function fn<Args extends any[]>(
  fn: (...args: Args) => unknown,
): (...args: Args) => unknown;

call(
  fn(function (a, b: number) {
    a; // string
  }),
);

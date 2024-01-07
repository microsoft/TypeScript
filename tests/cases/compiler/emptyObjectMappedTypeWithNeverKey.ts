// @strict: true
// @noEmit: true

declare const u: unknown;

type A = { [K in never]: any };
const a: null | undefined | A = u;

type Point = { x: number; y: number };
declare function foo<T, K extends keyof T>(
  obj: T,
  keys: K[],
  rest: Omit<T, K> | null | undefined,
): void;
const p: Point = { x: 0, y: 0 };
foo(p, ["x", "y"], u);

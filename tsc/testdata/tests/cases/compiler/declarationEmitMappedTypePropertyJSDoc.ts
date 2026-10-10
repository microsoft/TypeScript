// @declaration: true
type Writeable<T> = { -readonly [P in keyof T]: T[P] } & {};
declare function make<T>(shape: T): { shape: Writeable<T> };
export const a = make({
  /** doc for x */
  x: 1,
});
declare function pick<T, K extends keyof T>(t: T, k: K): { [P in K]: T[P] };
export const b = pick({
  /** doc for v */
  v: 1,
  w: 2,
}, "v");

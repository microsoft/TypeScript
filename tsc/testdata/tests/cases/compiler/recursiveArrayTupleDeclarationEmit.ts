// @strict: true
// @declaration: true

type G<T> = T extends unknown ? (T | G<[T]>)[] : never;
declare const g: G<"x">;
export const h = g;

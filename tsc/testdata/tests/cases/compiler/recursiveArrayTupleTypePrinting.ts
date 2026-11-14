// @strict: true
// @noErrorTruncation: true
// @noEmit: true

type G<T> = T extends unknown ? (T | G<[T]>)[] : never;
declare const g: G<"x">;
export const n: number = g;
export const later: number = "oops";

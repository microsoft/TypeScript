// @strict: true
// @declaration: true
// @target: esnext

// @filename: a.ts
export const f = <T>(x: T, y: NoInfer<T>) => x;

// @filename: b.ts
import { f } from "./a";

type NoInfer<T> = T & number;

export const g = f;

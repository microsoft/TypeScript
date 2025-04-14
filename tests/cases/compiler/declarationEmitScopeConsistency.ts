// @strict: true
// @declaration: true

// @filename: a.ts
export interface A { a: number }
export const f = (x: A) => x as A;

// @filename: b.ts
import { f } from "./a";
export interface A { other: number }
export const g = f;

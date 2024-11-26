// @strict: true
// @declaration: true
// @target: es2020

// @filename: a.ts
export const n = "A"
export const poz = 1;
export const neg = -1;
export const o = () => null! as { [n]: string, foo: string, [poz]: number, [neg]: number }

// @filename: b.ts
import { o } from "./a";
export const g = o
// @strict: true
// @declaration: true
// @target: es2020

// @filename: g.ts
const p = Symbol();
// @filename: a.ts

export const f = (x: {[p]: ""}) => x as {[p]: ""};

// @filename: b.ts
import { f } from "./a";
export const p = Symbol();
export const g = f;

// @module: esnext
// @target: esnext

// @filename: a.ts
export const a = 1;

// @filename: b.ts
import source a from "./a.js";
const b = import.source("./a.js");

const c: any = a;
const d: Promise<any> = b;

// @module: esnext
// @target: esnext

// @filename: a.d.txt.ts
export {};

// @filename: b.ts
import source a from "./a.txt";
const b = import.source("./a.txt");

a;
b;

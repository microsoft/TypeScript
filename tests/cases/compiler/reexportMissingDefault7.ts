// @target: es2015
// @strict: false
// @module: ES2015
// @filename: b.ts
export const b = null;

// @filename: a.ts
export { b } from "./b";
export { default } from "./b";
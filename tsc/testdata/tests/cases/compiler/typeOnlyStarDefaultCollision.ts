// @target: es2015
// @module: esnext

// @filename: first.ts
export default 1;

// @filename: second.ts
export default 2;

// @filename: barrel.ts
export type * from "./first";
export type * from "./second";

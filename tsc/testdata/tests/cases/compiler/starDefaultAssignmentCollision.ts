// @target: es2015
// @module: esnext

// @filename: first.ts
const first = 1;
export default first;

// @filename: second.ts
const second = 2;
export default second;

// @filename: barrel.ts
export * from "./first";
export * from "./second";

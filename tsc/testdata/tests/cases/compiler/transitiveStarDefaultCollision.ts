// @target: es2015
// @module: esnext

// @filename: first.ts
export default 1;

// @filename: second.ts
export default 2;

// @filename: nested.ts
export * from "./first";

// @filename: barrel.ts
export * from "./nested";
export * from "./second";

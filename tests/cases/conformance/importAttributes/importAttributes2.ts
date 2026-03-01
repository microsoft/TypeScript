// @declaration: true
// @target: es2015
// @module: es2015, commonjs, esnext

// @filename: 0.ts
export const a = 1;
export const b = 2;

// @filename: 1.ts
export {} from './0' with { type: "json" }
export { a, b } from './0' with { type: "json" }
export * from './0' with { type: "json" }
export * as ns from './0' with { type: "json" }

// @filename: 2.ts
export { a, b } from './0' with {}
export { a as c, b as d } from './0' with { a: "a", b: "b", c: "c" }

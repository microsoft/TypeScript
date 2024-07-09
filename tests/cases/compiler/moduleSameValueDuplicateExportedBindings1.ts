// @module: commonjs
// @filename: a.ts
export * from "./b";
export * from "./c";

// @filename: b.ts
export * from "./c";

// @filename: c.ts
export var foo = 42;
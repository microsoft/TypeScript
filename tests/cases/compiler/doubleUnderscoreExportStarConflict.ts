// @module: commonjs
// @filename: index.tsx

export * from "./b";
export * from "./c";

// @filename: b.ts
export function __foo(): number | void {}

// @filename: c.ts
export function __foo(): string | void {}

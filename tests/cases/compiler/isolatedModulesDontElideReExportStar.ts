// @isolatedModules: true
// @target: es6

// @filename: /a.ts
export type T = number;

// @filename: /b.ts
export * from "./a";

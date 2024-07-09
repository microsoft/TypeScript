// @preserveValueImports: true
// @importsNotUsedAsValues: preserve
// @module: esnext

// @Filename: /mod.ts
export type A = unknown;
export type B = never;
export type C = any;

// @Filename: /index.ts
import { type A, type B, type C } from "./mod.js";

// @Filename: /reexport.ts
export { type A, type B, type C } from "./mod.js";

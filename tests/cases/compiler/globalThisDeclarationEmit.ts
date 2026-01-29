// @module: commonjs
// @target: es2015
// @declaration: true
// @filename: index.ts
import { variable } from "./variable";
export const globalThis = variable;

// @filename: variable.ts
export const variable = globalThis;
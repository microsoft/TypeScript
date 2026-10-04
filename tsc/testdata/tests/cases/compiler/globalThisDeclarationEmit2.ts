// @module: commonjs
// @target: es2015
// @declaration: true
// @filename: index.ts
import { variable } from "./variable";
export { variable as globalThis };

// @filename: variable.ts
export const variable = globalThis;
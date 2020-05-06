// @declaration: true
// @filename: index.ts
import { variable } from "./variable";
export { variable as globalThis };

// @filename: variable.ts
import mod = globalThis;
export { mod as variable };
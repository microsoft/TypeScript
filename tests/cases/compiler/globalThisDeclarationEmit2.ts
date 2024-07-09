// @declaration: true
// @filename: index.ts
import { variable } from "./variable";
export { variable as globalThis };

// @filename: variable.ts
export const variable = globalThis;
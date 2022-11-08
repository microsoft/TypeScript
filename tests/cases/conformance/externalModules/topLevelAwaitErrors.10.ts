// @target: esnext
// @module: es2022,esnext

// @filename: index.ts
// await disallowed in alias of named import
import { await as await } from "./other";

// @filename: other.ts
declare const _await: any;
export { _await as await };

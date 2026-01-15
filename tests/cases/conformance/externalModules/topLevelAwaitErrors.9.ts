// @target: esnext
// @module: es2022,esnext

// @filename: index.ts
// await disallowed in un-alised named import
import { await } from "./other";

// @filename: other.ts
declare const _await: any;
export { _await as await };

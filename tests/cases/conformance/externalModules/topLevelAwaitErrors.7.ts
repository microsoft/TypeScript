// @target: esnext
// @module: es2022,esnext

// @filename: index.ts
// await disallowed in namespace import
import * as await from "./other";

// @filename: other.ts
declare const _await: any;
export { _await as await };

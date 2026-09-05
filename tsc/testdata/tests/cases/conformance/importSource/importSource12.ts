// @module: preserve
// @target: esnext
// @rewriteRelativeImportExtensions: true

// @filename: a.ts
export {};

// @filename: b.ts
import source a from "./a.ts";
export { a };
export const b = import.source("./a.ts");

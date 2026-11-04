// @module: nodenext
// @target: esnext
// @rewriteRelativeImportExtensions: true

// @filename: package.json
{"type":"commonjs"}

// @filename: a.ts
export {};

// @filename: b.cts
export const a = import.source("./a.ts");

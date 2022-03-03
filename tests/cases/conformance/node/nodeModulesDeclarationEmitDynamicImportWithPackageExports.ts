// @module: nodenext
// @declaration: true
// @filename: index.ts
// esm format file
export {};
// @filename: index.mts
// esm format file
export {};
// @filename: index.cts
// cjs format file
export {};
// @filename: other.ts
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
// @filename: other2.ts
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
// @filename: other.mts
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
// @filename: other2.mts
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
// @filename: other.cts
// cjs format file, no TLA
export const a = import("package/cjs");
export const b = import("package/mjs");
export const c = import("package");
export const f = import("inner");
// @filename: other2.cts
// cjs format file, no TLA
export const d = import("inner/cjs");
export const e = import("inner/mjs");
// @filename: node_modules/inner/index.d.ts
// cjs format file
export const cjsMain = true;
// @filename: node_modules/inner/index.d.mts
// esm format file
export const esm = true;
// @filename: node_modules/inner/index.d.cts
// cjs format file
export const cjsNonmain = true;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
// @filename: node_modules/inner/package.json
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
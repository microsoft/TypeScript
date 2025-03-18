//// [tests/cases/conformance/node/nodeModulesDeclarationEmitDynamicImportWithPackageExports.ts] ////

//// [index.ts]
// esm format file
export {};
//// [index.mts]
// esm format file
export {};
//// [index.cts]
// cjs format file
export {};
//// [other.ts]
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.ts]
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.mts]
// esm format file
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.mts]
// esm format file
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.cts]
// cjs format file, no TLA
export const a = import("package/cjs");
export const b = import("package/mjs");
export const c = import("package");
export const f = import("inner");
//// [other2.cts]
// cjs format file, no TLA
export const d = import("inner/cjs");
export const e = import("inner/mjs");
//// [index.d.ts]
// cjs format file
export const cjsMain = true;
//// [index.d.mts]
// esm format file
export const esm = true;
//// [index.d.cts]
// cjs format file
export const cjsNonmain = true;
//// [package.json]
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
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}

//// [index.js]
export {};
//// [index.mjs]
export {};
//// [index.cjs]
export {};
//// [other.js]
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.js]
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.mjs]
export const a = await import("package/cjs");
export const b = await import("package/mjs");
export const c = await import("package");
export const f = await import("inner");
//// [other2.mjs]
export const d = await import("inner/cjs");
export const e = await import("inner/mjs");
//// [other.cjs]
export const a = import("package/cjs");
export const b = import("package/mjs");
export const c = import("package");
export const f = import("inner");
//// [other2.cjs]
export const d = import("inner/cjs");
export const e = import("inner/mjs");

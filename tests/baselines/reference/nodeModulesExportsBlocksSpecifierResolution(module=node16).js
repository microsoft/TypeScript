//// [tests/cases/conformance/node/nodeModulesExportsBlocksSpecifierResolution.ts] ////

//// [index.ts]
// esm format file
import { Thing } from "inner/other";
export const a = (await import("inner")).x();
//// [index.d.ts]
// esm format file
export { x } from "./other.js";
//// [other.d.ts]
// esm format file
export interface Thing {}
export const x: () => Thing;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}

//// [index.js]
export const a = (await import("inner")).x();

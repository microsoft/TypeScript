//// [tests/cases/conformance/node/nodeModulesExportsSourceTs.ts] ////

//// [index.ts]
// esm format file
import { Thing } from "inner/other";
export const a = (await import("inner")).x();
import {a as a2} from "package";
//// [index.ts]
// esm format file
export { x } from "./other.js";
//// [other.ts]
// esm format file
export interface Thing {}
export const x: () => Thing = null as any;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.ts"
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": "./index.ts"
}

//// [other.js]
export const x = null;
//// [index.js]
// esm format file
export { x } from "./other.js";
//// [index.js]
export const a = (await import("inner")).x();


//// [other.d.ts]
export interface Thing {
}
export declare const x: () => Thing;
//// [index.d.ts]
export { x } from "./other.js";

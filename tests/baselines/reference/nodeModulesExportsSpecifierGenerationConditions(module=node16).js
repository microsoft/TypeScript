//// [tests/cases/conformance/node/nodeModulesExportsSpecifierGenerationConditions.ts] ////

//// [index.ts]
// esm format file
import { Thing } from "inner/other.js"; // should fail
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
    "exports": {
        ".": {
            "default": "./index.js"
        },
        "./other": {
            "default": "./other.js"
        }
    }
}

//// [index.js]
export const a = (await import("inner")).x();


//// [index.d.ts]
export declare const a: import("inner/other").Thing;

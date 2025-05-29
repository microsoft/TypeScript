//// [tests/cases/conformance/node/nodeModulesExportsSpecifierGenerationPattern.ts] ////

//// [index.ts]
// esm format file
import { Thing } from "inner/other";
export const a = (await import("inner/index.js")).x();
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
        "./*.js": "./*.js"
    }
}

//// [index.js]
export const a = (await import("inner/index.js")).x();


//// [index.d.ts]
export declare const a: any;

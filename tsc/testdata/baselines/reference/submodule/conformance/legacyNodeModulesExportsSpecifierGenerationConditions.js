//// [tests/cases/conformance/node/legacyNodeModulesExportsSpecifierGenerationConditions.ts] ////

//// [index.ts]
export const a = async () => (await import("inner")).x();
//// [index.d.ts]
export { x } from "./other.js";
//// [other.d.ts]
import { Thing } from "./private.js"
export const x: () => Thing;
//// [private.d.ts]
export interface Thing {} // not exported in export map, inaccessible under new module modes
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = async () => (await Promise.resolve().then(() => require("inner"))).x();
exports.a = a;

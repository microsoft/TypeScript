// @module: commonjs
// @lib: es2020
// @declaration: true
// @filename: index.ts
export const a = async () => (await import("inner")).x();
// @filename: node_modules/inner/index.d.ts
export { x } from "./other.js";
// @filename: node_modules/inner/other.d.ts
import { Thing } from "./private.js"
export const x: () => Thing;
// @filename: node_modules/inner/private.d.ts
export interface Thing {} // not exported in export map, inaccessible under new module modes
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}
// @filename: node_modules/inner/package.json
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
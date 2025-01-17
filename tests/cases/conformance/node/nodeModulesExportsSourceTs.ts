// @module: node16,node18,nodenext
// @declaration: true
// @filename: index.ts
// esm format file
import { Thing } from "inner/other";
export const a = (await import("inner")).x();
import {a as a2} from "package";
// @filename: node_modules/inner/index.ts
// esm format file
export { x } from "./other.js";
// @filename: node_modules/inner/other.ts
// esm format file
export interface Thing {}
export const x: () => Thing = null as any;
// @filename: package.json
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.ts"
}
// @filename: node_modules/inner/package.json
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": "./index.ts"
}
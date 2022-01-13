// @module: node12,nodenext
// @resolveJsonModule: true
// @outDir: ./out
// @declaration: true
// @filename: index.ts
import pkg from "./package.json"
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
// @filename: index.cts
import pkg from "./package.json"
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
// @filename: index.mts
import pkg from "./package.json"
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
// @filename: package.json
{
    "name": "pkg",
    "version": "0.0.1",
    "type": "module",
    "default": "misedirection"
}
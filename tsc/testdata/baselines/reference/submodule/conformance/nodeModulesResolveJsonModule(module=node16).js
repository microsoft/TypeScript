//// [tests/cases/conformance/node/nodeModulesResolveJsonModule.ts] ////

//// [index.ts]
import pkg from "./package.json" with { type: "json" };
export const name = pkg.name;
import * as ns from "./package.json" with { type: "json" };
export const thing = ns;
export const name2 = ns.default.name;
//// [index.cts]
import pkg from "./package.json";
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
//// [index.mts]
import pkg from "./package.json" with { type: "json" };
export const name = pkg.name;
import * as ns from "./package.json" with { type: "json" };
export const thing = ns;
export const name2 = ns.default.name;
//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "type": "module",
    "default": "misedirection"
}

//// [index.js]
import pkg from "./package.json" with { type: "json" };
export const name = pkg.name;
import * as ns from "./package.json" with { type: "json" };
export const thing = ns;
export const name2 = ns.default.name;
//// [index.cjs]
import pkg from "./package.json";
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
//// [index.mjs]
import pkg from "./package.json" with { type: "json" };
export const name = pkg.name;
import * as ns from "./package.json" with { type: "json" };
export const thing = ns;
export const name2 = ns.default.name;

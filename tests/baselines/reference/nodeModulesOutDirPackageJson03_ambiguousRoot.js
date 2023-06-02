//// [tests/cases/conformance/node/nodeModulesOutDirPackageJson03_ambiguousRoot.ts] ////

//// [package.json]
{ "type": "module" }

//// [c.ts]
export {};

//// [a.ts]
import { b } from "./b.js";

//// [b.ts]
export const b = 0;
export * from "../c.js";


//// [/out/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [/out/src/b.js]
export const b = 0;
export * from "../c.js";
//// [/out/src/a.js]
export {};

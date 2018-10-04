//// [tests/cases/compiler/moduleResolution_packageJson_scopedPackage.ts] ////

//// [package.json]
{ "types": "types.d.ts" }

//// [types.d.ts]
export const x: number;

//// [a.ts]
import { x } from "@foo/bar";


//// [a.js]
"use strict";
exports.__esModule = true;

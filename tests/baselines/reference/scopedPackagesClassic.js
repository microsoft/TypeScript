//// [tests/cases/conformance/moduleResolution/scopedPackagesClassic.ts] ////

//// [index.d.ts]
export const x = 0;

//// [a.ts]
import { x } from "@see/saw";


//// [a.js]
"use strict";
exports.__esModule = true;

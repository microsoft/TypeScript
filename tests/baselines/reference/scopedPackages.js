//// [tests/cases/conformance/moduleResolution/scopedPackages.ts] ////

//// [index.d.ts]
export const x: number;

//// [index.d.ts]
export const y: number;

//// [z.d.ts]
export const z: number;

//// [a.ts]
import { x } from "@cow/boy";
import { y } from "@be/bop";
import { z } from "@be/bop/e/z";


//// [a.js]
"use strict";
exports.__esModule = true;

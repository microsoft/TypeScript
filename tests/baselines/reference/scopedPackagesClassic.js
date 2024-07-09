//// [tests/cases/conformance/moduleResolution/scopedPackagesClassic.ts] ////

//// [index.d.ts]
export const x = 0;

//// [a.ts]
import { x } from "@see/saw";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

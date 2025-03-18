//// [tests/cases/compiler/moduleResolutionWithSymlinks_preserveSymlinks.ts] ////

//// [index.d.ts]
export { real } from "real";
export class C { private x; }

//// [index.d.ts]
export const real: string;

//// [app.ts]
// We shouldn't resolve symlinks for references either. See the trace.
/// <reference types="linked" />

import { C as C1 } from "linked";
import { C as C2 } from "linked2";

let x = new C1();
// Should fail. We no longer resolve any symlinks.
x = new C2();


//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_1 = require("linked");
const linked2_1 = require("linked2");
let x = new linked_1.C();
x = new linked2_1.C();

//// [tests/cases/compiler/systemExportAssignment.ts] ////

//// [a.d.ts]
declare var a: number;
export = a;  // OK, in ambient context

//// [b.ts]
import * as a from "a";


//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

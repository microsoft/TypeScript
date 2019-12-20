//// [tests/cases/compiler/moduleResolutionWithExtensions_withAmbientPresent.ts] ////

//// [index.js]
// Allowjs is false, but this should *not* warn about the unused 'index.js'


//// [declarations.d.ts]
declare module "js" {
    export const x = 0;
}

//// [a.ts]
/// <reference path="declarations.d.ts" />
import { x } from "js";


//// [a.js]
"use strict";
exports.__esModule = true;

//// [tests/cases/compiler/moduleResolutionWithExtensions_withAmbientPresent.ts] ////

//// [index.js]

//// [declarations.d.ts]
declare module "js" {
    export const x = 0;
}

//// [a.ts]
/// <reference path="declarations.d.ts" />
import { x } from "js";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

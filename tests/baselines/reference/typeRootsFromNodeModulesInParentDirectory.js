//// [tests/cases/compiler/typeRootsFromNodeModulesInParentDirectory.ts] ////

//// [index.d.ts]
declare module "xyz" {
    export const x: number;
}

//// [a.ts]
import { x } from "xyz";
x;


//// [a.js]
"use strict";
exports.__esModule = true;
var xyz_1 = require("xyz");
xyz_1.x;

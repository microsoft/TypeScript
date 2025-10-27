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
Object.defineProperty(exports, "__esModule", { value: true });
const xyz_1 = require("xyz");
xyz_1.x;

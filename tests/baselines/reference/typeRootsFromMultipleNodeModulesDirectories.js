//// [tests/cases/compiler/typeRootsFromMultipleNodeModulesDirectories.ts] ////

//// [index.d.ts]
declare module "xyz" {
    export const x: number;
}

//// [index.d.ts]
declare module "pdq" {
    export const y: number; 
}

//// [index.d.ts]
declare module "abc" {
    export const z: number;
}

//// [a.ts]
import { x } from "xyz";
import { y } from "pdq";
import { z } from "abc";
x + y + z;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xyz_1 = require("xyz");
var pdq_1 = require("pdq");
var abc_1 = require("abc");
xyz_1.x + pdq_1.y + abc_1.z;

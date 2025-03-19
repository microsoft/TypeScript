//// [tests/cases/conformance/ambient/ambientExternalModuleMerging.ts] ////

//// [ambientExternalModuleMerging_use.ts]
import M = require("M");
// Should be strings
var x = M.x;
var y = M.y;

//// [ambientExternalModuleMerging_declare.ts]
declare module "M" {
    export var x: string;
}

// Merge
declare module "M" {
    export var y: string;
}

//// [ambientExternalModuleMerging_use.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const M = require("M");
// Should be strings
var x = M.x;
var y = M.y;
//// [ambientExternalModuleMerging_declare.js]

//// [tests/cases/compiler/exportAssignmentInternalModule.ts] ////

//// [exportAssignmentInternalModule_A.ts]
module M {
	export var x;
}

export = M;

//// [exportAssignmentInternalModule_B.ts]
import modM = require("exportAssignmentInternalModule_A");

var n: number = modM.x;

//// [exportAssignmentInternalModule_B.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modM = require("exportAssignmentInternalModule_A");
var n = modM.x;

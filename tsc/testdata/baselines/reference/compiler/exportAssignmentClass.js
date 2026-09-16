//// [tests/cases/compiler/exportAssignmentClass.ts] ////

//// [exportAssignmentClass_A.ts]
class C { public p = 0; }

export = C;

//// [exportAssignmentClass_B.ts]
import D = require("exportAssignmentClass_A");

var d = new D();
var x = d.p;

//// [exportAssignmentClass_B.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const D = require("exportAssignmentClass_A");
var d = new D();
var x = d.p;

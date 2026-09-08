//// [tests/cases/compiler/exportAssignmentFunction.ts] ////

//// [exportAssignmentFunction_A.ts]
function foo() { return 0; }

export = foo;

//// [exportAssignmentFunction_B.ts]
import fooFunc = require("exportAssignmentFunction_A");

var n: number = fooFunc();

//// [exportAssignmentFunction_B.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fooFunc = require("exportAssignmentFunction_A");
var n = fooFunc();

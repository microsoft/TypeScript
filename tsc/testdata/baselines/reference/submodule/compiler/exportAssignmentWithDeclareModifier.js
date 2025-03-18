//// [tests/cases/compiler/exportAssignmentWithDeclareModifier.ts] ////

//// [exportAssignmentWithDeclareModifier.ts]
var x;
declare export = x;

//// [exportAssignmentWithDeclareModifier.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x;

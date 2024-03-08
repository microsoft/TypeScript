//// [tests/cases/compiler/exportAssignmentWithDeclareModifier.ts] ////

//// [exportAssignmentWithDeclareModifier.ts]
var x;
declare export = x;

//// [exportAssignmentWithDeclareModifier.js]
"use strict";
var x;
module.exports = x;

//// [tests/cases/compiler/spaceBeforeQuestionMarkInPropertyAssignment.ts] ////

//// [spaceBeforeQuestionMarkInPropertyAssignment.ts]
var x = {x ?: 1} // should not crash

//// [spaceBeforeQuestionMarkInPropertyAssignment.js]
"use strict";
var x = { x: 1 }; // should not crash

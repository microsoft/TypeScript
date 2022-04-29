//// [spaceBeforeQuestionMarkInPropertyAssignment.ts]
var x = {x ?: 1} // should not crash

//// [spaceBeforeQuestionMarkInPropertyAssignment.js]
var x = { x: 1 }; // should not crash

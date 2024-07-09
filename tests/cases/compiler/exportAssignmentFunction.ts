//@module: amd
// @Filename: exportAssignmentFunction_A.ts
function foo() { return 0; }

export = foo;

// @Filename: exportAssignmentFunction_B.ts
import fooFunc = require("exportAssignmentFunction_A");

var n: number = fooFunc();
//@module: amd
// @Filename: exportAssignmentInterface_A.ts
interface A {
	p1: number;
}

export = A;

// @Filename: exportAssignmentInterface_B.ts
import I1 = require("exportAssignmentInterface_A");

var i: I1;

var n: number = i.p1;
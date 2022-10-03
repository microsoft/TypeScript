// @module: commonjs
// @Filename: exportAssignmentEnum_A.ts
enum E {
	A,
	B,
	C,
}

export = E;

// @Filename: exportAssignmentEnum_B.ts
import EnumE = require("./exportAssignmentEnum_A");

var a = EnumE.A;
var b = EnumE.B;
var c = EnumE.C;
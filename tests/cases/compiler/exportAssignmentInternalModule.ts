//@module: amd
// @Filename: exportAssignmentInternalModule_A.ts
module M {
	export var x;
}

export = M;

// @Filename: exportAssignmentInternalModule_B.ts
import modM = require("exportAssignmentInternalModule_A");

var n: number = modM.x;
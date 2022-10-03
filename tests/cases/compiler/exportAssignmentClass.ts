//@module: amd
// @Filename: exportAssignmentClass_A.ts
class C { public p = 0; }

export = C;

// @Filename: exportAssignmentClass_B.ts
import D = require("exportAssignmentClass_A");

var d = new D();
var x = d.p;
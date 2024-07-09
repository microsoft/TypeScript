// @module: commonjs
// @Filename: exportAssignmentVariable_A.ts
var x = 0;

export = x;

// @Filename: exportAssignmentVariable_B.ts
import y = require("./exportAssignmentVariable_A");

var n: number = y;
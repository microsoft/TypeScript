//// [exportAssignmentInterface_B.ts]
import I1 = require("exportAssignmentInterface_A");

var i: I1;

var n: number = i.p1;

//// [exportAssignmentInterface_A.js]
define(["require", "exports"], function(require, exports) {
    
});
//// [exportAssignmentInterface_B.js]
define(["require", "exports"], function(require, exports) {
    var i;

    var n = i.p1;
});

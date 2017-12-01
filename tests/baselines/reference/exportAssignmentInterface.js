//// [tests/cases/compiler/exportAssignmentInterface.ts] ////

//// [exportAssignmentInterface_A.ts]
interface A {
	p1: number;
}

export = A;

//// [exportAssignmentInterface_B.ts]
import I1 = require("exportAssignmentInterface_A");

var i: I1;

var n: number = i.p1;

//// [exportAssignmentInterface_A.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [exportAssignmentInterface_B.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var i;
    var n = i.p1;
});

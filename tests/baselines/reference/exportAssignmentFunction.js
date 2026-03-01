//// [tests/cases/compiler/exportAssignmentFunction.ts] ////

//// [exportAssignmentFunction_A.ts]
function foo() { return 0; }

export = foo;

//// [exportAssignmentFunction_B.ts]
import fooFunc = require("exportAssignmentFunction_A");

var n: number = fooFunc();

//// [exportAssignmentFunction_A.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    function foo() { return 0; }
    return foo;
});
//// [exportAssignmentFunction_B.js]
define(["require", "exports", "exportAssignmentFunction_A"], function (require, exports, fooFunc) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var n = fooFunc();
});

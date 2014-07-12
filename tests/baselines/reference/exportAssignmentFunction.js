//// [exportAssignmentFunction_B.ts]
import fooFunc = require("exportAssignmentFunction_A");

var n: number = fooFunc();

//// [exportAssignmentFunction_A.js]
define(["require", "exports"], function(require, exports) {
    function foo() {
        return 0;
    }

    
    return foo;
});
//// [exportAssignmentFunction_B.js]
define(["require", "exports", "exportAssignmentFunction_A"], function(require, exports, fooFunc) {
    var n = fooFunc();
});

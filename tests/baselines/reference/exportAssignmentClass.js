//// [exportAssignmentClass_B.ts]
import D = require("exportAssignmentClass_A");

var d = new D();
var x = d.p;

//// [exportAssignmentClass_A.js]
define(["require", "exports"], function(require, exports) {
    var C = (function () {
        function C() {
            this.p = 0;
        }
        return C;
    })();

    
    return C;
});
//// [exportAssignmentClass_B.js]
define(["require", "exports", "exportAssignmentClass_A"], function(require, exports, D) {
    var d = new D();
    var x = d.p;
});

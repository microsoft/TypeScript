//// [exportAssignmentInternalModule_B.ts]
import modM = require("exportAssignmentInternalModule_A");

var n: number = modM.x;

//// [exportAssignmentInternalModule_A.js]
define(["require", "exports"], function(require, exports) {
    var M;
    (function (M) {
        M.x;
    })(M || (M = {}));

    
    return M;
});
//// [exportAssignmentInternalModule_B.js]
define(["require", "exports", "exportAssignmentInternalModule_A"], function(require, exports, modM) {
    var n = modM.x;
});

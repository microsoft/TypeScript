//// [tests/cases/compiler/exportAssignmentInternalModule.ts] ////

//// [exportAssignmentInternalModule_A.ts]
module M {
	export var x;
}

export = M;

//// [exportAssignmentInternalModule_B.ts]
import modM = require("exportAssignmentInternalModule_A");

var n: number = modM.x;

//// [exportAssignmentInternalModule_A.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var M;
    (function (M) {
    })(M || (M = {}));
    return M;
});
//// [exportAssignmentInternalModule_B.js]
define(["require", "exports", "exportAssignmentInternalModule_A"], function (require, exports, modM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var n = modM.x;
});

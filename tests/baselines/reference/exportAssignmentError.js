//// [exportAssignmentError.ts]
module M {
	export var x;
}

import M2 = M;

export = M2; // should not error


//// [exportAssignmentError.js]
define(["require", "exports"], function(require, exports) {
    var M;
    (function (M) {
        M.x;
    })(M || (M = {}));

    var M2 = M;

    
    return M2;
});

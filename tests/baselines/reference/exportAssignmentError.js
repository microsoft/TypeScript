//// [exportEqualsModule_A.ts]
module M {
	export var x;
}

import M2 = M;

export = M2; // should not error


//// [exportEqualsModule_A.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var M;
    (function (M) {
    })(M || (M = {}));
    var M2 = M;
    return M2;
});

//// [tests/cases/compiler/exportAssignmentError.ts] ////

//// [exportEqualsModule_A.ts]
module M {
	export var x;
}

import M2 = M;

export = M2; // should not error


//// [exportEqualsModule_A.js]
"use strict";
var M;
(function (M) {
})(M || (M = {}));
module.exports = M2;

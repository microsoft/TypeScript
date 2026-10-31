//// [tests/cases/compiler/exportAssignmentError.ts] ////

//// [exportEqualsModule_A.ts]
namespace M {
	export var x;
}

import M2 = M;

export = M2; // should not error


//// [exportEqualsModule_A.js]
"use strict";
var M;
(function (M) {
})(M || (M = {}));
var M2 = M;
module.exports = M2;

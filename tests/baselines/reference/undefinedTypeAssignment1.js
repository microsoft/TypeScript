//// [tests/cases/compiler/undefinedTypeAssignment1.ts] ////

//// [undefinedTypeAssignment1.ts]
type undefined = string;
function p(undefined = "wat") {
	return undefined;
}


//// [undefinedTypeAssignment1.js]
"use strict";
function p(undefined) {
    if (undefined === void 0) { undefined = "wat"; }
    return undefined;
}

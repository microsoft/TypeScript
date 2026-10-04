//// [tests/cases/compiler/functionOnlyHasThrow.ts] ////

//// [functionOnlyHasThrow.ts]
function clone():number {
	throw new Error("To be implemented");
}

//// [functionOnlyHasThrow.js]
"use strict";
function clone() {
    throw new Error("To be implemented");
}

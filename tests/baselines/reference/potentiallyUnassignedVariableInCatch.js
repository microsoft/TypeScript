//// [tests/cases/compiler/potentiallyUnassignedVariableInCatch.ts] ////

//// [potentiallyUnassignedVariableInCatch.ts]
let foo;
try {
	if (Math.random() > 0.5) {
		foo = 1234;
	}
} catch {
	foo;
}


//// [potentiallyUnassignedVariableInCatch.js]
"use strict";
var foo;
try {
    if (Math.random() > 0.5) {
        foo = 1234;
    }
}
catch (_a) {
    foo;
}

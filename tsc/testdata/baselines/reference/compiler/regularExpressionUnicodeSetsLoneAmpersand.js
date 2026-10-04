//// [tests/cases/compiler/regularExpressionUnicodeSetsLoneAmpersand.ts] ////

//// [regularExpressionUnicodeSetsLoneAmpersand.ts]
const regexes: RegExp[] = [
	/[?&]/v,
	/[a&]/v,
	/[&a]/v,
];


//// [regularExpressionUnicodeSetsLoneAmpersand.js]
"use strict";
const regexes = [
    /[?&]/v,
    /[a&]/v,
    /[&a]/v,
];

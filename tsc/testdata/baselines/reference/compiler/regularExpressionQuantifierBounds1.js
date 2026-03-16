//// [tests/cases/compiler/regularExpressionQuantifierBounds1.ts] ////

//// [regularExpressionQuantifierBounds1.ts]
const regexes: RegExp[] = [
	/a{7,8}/,
	/a{9223372036854775807,9223372036854775808}/,
	/a{8,7}/,
	/a{9223372036854775808,9223372036854775807}/,
	/a{8,8}/,
	/a{9223372036854775808,9223372036854775808}/,
];


//// [regularExpressionQuantifierBounds1.js]
"use strict";
const regexes = [
    /a{7,8}/,
    /a{9223372036854775807,9223372036854775808}/,
    /a{8,7}/,
    /a{9223372036854775808,9223372036854775807}/,
    /a{8,8}/,
    /a{9223372036854775808,9223372036854775808}/,
];

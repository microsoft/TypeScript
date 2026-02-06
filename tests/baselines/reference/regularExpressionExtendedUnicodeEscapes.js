//// [tests/cases/compiler/regularExpressionExtendedUnicodeEscapes.ts] ////

//// [regularExpressionExtendedUnicodeEscapes.ts]
const regexes: RegExp[] = [
	/\u{10000}[\u{10000}]/,
	/\u{10000}[\u{10000}]/u,
	/\u{10000}[\u{10000}]/v,
];


//// [regularExpressionExtendedUnicodeEscapes.js]
"use strict";
const regexes = [
    /\u{10000}[\u{10000}]/,
    /\u{10000}[\u{10000}]/u,
    /\u{10000}[\u{10000}]/v,
];

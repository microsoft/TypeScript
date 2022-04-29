/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function f([|a, b, c, d: number, e = 0, ...d |]) {
//// }
//// f(1, "string", { a: 1 }, {shouldNotBeHere: 2}, {shouldNotBeHere: 2}, 3, "string");


verify.rangeAfterCodeFix("a: number, b: string, c: { a: number; }, d: number, e = 0, ...d: (string | number)[]", /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 1);

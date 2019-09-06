/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function foo([|p, a, b, c, d |]) {
////     var x
////     p.charAt(x)
////     a.charAt(0)
////     b.concat('hi')
//// }

verify.rangeAfterCodeFix("p: string, a: string, b: string | string[]", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);


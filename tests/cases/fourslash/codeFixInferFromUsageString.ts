/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function foo([|p, a, b |]) {
////     var x
////     p.charAt(x)
////     a.charAt(0)
////     b.concat('hi')
//// }

verify.rangeAfterCodeFix("p: string, a: string, b: string | any[]", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);


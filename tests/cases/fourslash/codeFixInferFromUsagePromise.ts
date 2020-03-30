/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function foo([|p |]) {
////     return p.then((x: string[]) => x[0])
//// }

verify.rangeAfterCodeFix("p: Promise<string[]>", /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, /*index*/0);


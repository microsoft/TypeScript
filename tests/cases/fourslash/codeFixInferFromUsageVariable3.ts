/// <reference path='fourslash.ts' />

// @noImplicitAny: false
////[|var x;
////function f() {
////    x++;
////}|]

verify.rangeAfterCodeFix(`var x: number;
function f() {
    x++;
}
`, /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 0);

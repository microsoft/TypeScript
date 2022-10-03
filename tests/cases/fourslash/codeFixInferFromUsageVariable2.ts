/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////[|var x;
////function f() {
////    x++;
////}|]

verify.rangeAfterCodeFix(`var x: number;
function f() {
    x++;
}
`, /*includeWhiteSpace*/ undefined, /*errorCode*/ undefined, 1);

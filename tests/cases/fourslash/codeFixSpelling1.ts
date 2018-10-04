/// <reference path='fourslash.ts' />

////[|function foo(s: string) {
////    return s.toStrang();
////}|]

verify.rangeAfterCodeFix(`function foo(s: string) {
    return s.toString();
}`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);

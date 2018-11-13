/// <reference path='fourslash.ts' />

////[|function foo<T extends number | string>(x: T) {
////    return x.toStrang();
////}|]

verify.rangeAfterCodeFix(`function foo<T extends number | string>(x: T) {
    return x.toString();
}`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);

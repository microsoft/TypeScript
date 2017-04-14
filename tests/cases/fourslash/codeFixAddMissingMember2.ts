/// <reference path='fourslash.ts' />

////[|class C {
////    method() {
////        this.foo = 10;
////    }
////}|]

verify.rangeAfterCodeFix(`class C {
    [x:string]: number;
    method() {
        this.foo = 10;
    }
}`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 1);
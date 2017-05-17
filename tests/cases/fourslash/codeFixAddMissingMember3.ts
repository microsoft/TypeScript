/// <reference path='fourslash.ts' />

////[|class C {
////    static method() {
////        this.foo = 10;
////    }
////}|]

verify.rangeAfterCodeFix(`class C {
    static foo: number;
    static method() {
        this.foo = 10;
    }
}`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);

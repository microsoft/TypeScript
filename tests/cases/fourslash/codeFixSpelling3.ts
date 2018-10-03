/// <reference path='fourslash.ts' />

////[|class C {
////    state = 'hi'
////    doStuff() {
////        this.start;
////    }
////}|]

verify.rangeAfterCodeFix(`class C {
    state = 'hi'
    doStuff() {
        this.state;
    }
}`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 2);

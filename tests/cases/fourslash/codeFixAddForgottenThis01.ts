/// <reference path='fourslash.ts' />

////class C {
////    foo: number;
////    constructor() {[|
////        foo = 10;
////    |]}
////}

verify.rangeAfterCodeFix(`
        this.foo = 10;
    `, /*includeWhitespace*/ true);
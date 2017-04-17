/// <reference path='fourslash.ts' />

////class C {
////    constructor(public foo) {
////    }
////    bar() { [|foo = 10|] };
////}

verify.rangeAfterCodeFix("this.foo = 10");
/// <reference path='fourslash.ts' />

////class C {
////    constructor(public foo) {
////    }
////    bar() { [|foo = 10|] };
////}

verify.codeFix({
    description: "Add 'this.' to unresolved variable",
    index: 0,
    newRangeContent: "this.foo = 10",
});

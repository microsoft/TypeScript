/// <reference path='fourslash.ts' />

////class C {
////    foo: number;
////    constructor() {[|
////        /* a comment */foo = 10;
////    |]}
////}

verify.codeFix({
    description: "Add 'this.' to unresolved variable",
    newRangeContent: `
        /* a comment */this.foo = 10;
    `
});

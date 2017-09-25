/// <reference path='fourslash.ts' />

////class C {
////    foo: number;
////    constructor() {[|
////        foo = 10;
////    |]}
////}

verify.codeFix({
    description: "Add 'this.' to unresolved variable.",
    newContent: `
        this.foo = 10;
    `
});

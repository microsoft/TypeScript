/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        this.foo = 10;
////    }
////}

verify.codeFix({
    description: "Add index signature for property 'foo'",
    index: 1,
    newFileContent: `class C {
    [x: string]: number;
    method() {
        this.foo = 10;
    }
}`
});

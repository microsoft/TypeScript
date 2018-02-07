/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        this.foo = 10;
////    }
////}

verify.codeFix({
    description: "Declare property 'foo'",
    index: 0,
    newFileContent: `class C {
    foo: number;
    method() {
        this.foo = 10;
    }
}`
});

/// <reference path='fourslash.ts' />

////class C {
////    method() {
////        this.foo = 10;
////    }
////}

verify.codeFix({
    description: "Declare property 'foo'.",
    index: 0,
    // TODO: GH#18445
    newFileContent: `class C {
    foo: number;\r
    method() {
        this.foo = 10;
    }
}`
});

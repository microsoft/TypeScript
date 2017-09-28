/// <reference path='fourslash.ts' />

////class C {
////    static method() {
////        this.foo = 10;
////    }
////}

verify.codeFix({
    description: "Declare static property 'foo'.",
    index: 0,
    // TODO: GH#18445
    newFileContent: `class C {
    static foo: number;\r
    static method() {
        this.foo = 10;
    }
}`
});

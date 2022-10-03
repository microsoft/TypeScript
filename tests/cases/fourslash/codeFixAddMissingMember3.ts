/// <reference path='fourslash.ts' />

////class C {
////    static method() {
////        this.foo = 10;
////    }
////}

verify.codeFix({
    description: "Declare static property 'foo'",
    index: 0,
    newFileContent: `class C {
    static foo: number;
    static method() {
        this.foo = 10;
    }
}`
});

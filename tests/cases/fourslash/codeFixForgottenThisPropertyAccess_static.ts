/// <reference path='fourslash.ts' />

////class C {
////    static m() {
////        m();
////    }
////}

verify.codeFix({
    description: "Add 'this.' to unresolved variable",
    newFileContent:
`class C {
    static m() {
        this.m();
    }
}`
});

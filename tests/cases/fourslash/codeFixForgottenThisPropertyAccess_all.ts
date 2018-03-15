/// <reference path='fourslash.ts' />

////class C {
////    foo: number;
////    m() {
////        foo;
////        foo;
////    }
////}

verify.codeFixAll({
    fixId: "forgottenThisPropertyAccess",
    fixAllDescription: "Fix all like: Add 'this.' to unresolved variable",
    newFileContent:
`class C {
    foo: number;
    m() {
        this.foo;
        this.foo;
    }
}`,
});

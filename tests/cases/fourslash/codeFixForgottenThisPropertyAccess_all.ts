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
    fixAllDescription: "Add 'this.' to all unresolved variables matching a member name",
    newFileContent:
`class C {
    foo: number;
    m() {
        this.foo;
        this.foo;
    }
}`,
});

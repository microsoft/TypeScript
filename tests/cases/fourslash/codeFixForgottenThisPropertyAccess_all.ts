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
    newFileContent:
`class C {
    foo: number;
    m() {
        this.foo;
        this.foo;
    }
}`,
});

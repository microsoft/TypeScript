/// <reference path='fourslash.ts' />

////class A {
////    f() {}
////}
////
////class B implements A {[| |]}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "A"],
    index: 1,
    newFileContent:
`class A {
    f() {}
}

class B implements A {
    f(): void {
        throw new Error("Method not implemented.");
    }
}`,
});

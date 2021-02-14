/// <reference path='fourslash.ts' />

////interface I {
////    f(x: number, y: this): I
////}
////
////class C implements I {[| |]}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I"],
    index: 1,
    newFileContent:
`interface I {
    f(x: number, y: this): I
}

class C implements I {
    f(x: number, y: this): I {
        throw new Error("Method not implemented.");
    }
}`,
});

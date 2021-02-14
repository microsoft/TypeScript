/// <reference path='fourslash.ts' />

////interface I1 {
////    x: number,
////    y: number
////    z: number;
////    f(): number,
////    g(): any
////    h();
////}
////
////class C1 implements I1 {}

verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "I1"],
    index: 1,
    newFileContent:
`interface I1 {
    x: number,
    y: number
    z: number;
    f(): number,
    g(): any
    h();
}

class C1 implements I1 {
    x: number;
    y: number;
    z: number;
    f(): number {
        throw new Error("Method not implemented.");
    }
    g() {
        throw new Error("Method not implemented.");
    }
    h() {
        throw new Error("Method not implemented.");
    }
}`,
});

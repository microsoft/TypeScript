/// <reference path='fourslash.ts' />

////interface I1 {
////    x: number,
////    y: number
////    z: number;
////    f(),
////    g()
////    h();
////}
////
////class C1 implements I1 {}

verify.codeFix({
    description: "Implement interface 'I1'",
    // TODO: GH#18445
    newFileContent:
`interface I1 {
    x: number,
    y: number
    z: number;
    f(),
    g()
    h();
}

class C1 implements I1 {
    x: number;
    y: number;
    z: number;
    f() {
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

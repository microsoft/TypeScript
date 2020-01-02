/// <reference path='fourslash.ts' />

////interface I1 {
////    x: number,
////    y: number
////    z: number;
////    f(): number,
////    g()
////    h();
////}
////
////class C1 implements I1 {}

verify.codeFix({
    description: "Implement interface 'I1'",
    newFileContent:
`interface I1 {
    x: number,
    y: number
    z: number;
    f(): number,
    g()
    h();
}

class C1 implements I1 {
    x: number;
    y: number;
    z: number;
    f(): number {
        throw new Error("Method not implemented.");
    }
    g(): any {
        throw new Error("Method not implemented.");
    }
    h(): any {
        throw new Error("Method not implemented.");
    }
}`,
});

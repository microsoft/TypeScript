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

class C1 implements I1 {\r
    x: number;\r
    y: number;\r
    z: number;\r
    f() {\r
        throw new Error("Method not implemented.");\r
    }\r
    g() {\r
        throw new Error("Method not implemented.");\r
    }\r
    h() {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});

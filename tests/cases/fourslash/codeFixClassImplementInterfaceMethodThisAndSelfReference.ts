/// <reference path='fourslash.ts' />

////interface I {
////    f(x: number, y: this): I
////}
////
////class C implements I {[| |]}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`interface I {
    f(x: number, y: this): I
}

class C implements I {\r
    f(x: number, y: this): I {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});

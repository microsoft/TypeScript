/// <reference path='fourslash.ts' />

////interface I {
////    f(x: number, y: this): I
////}
////
////class C implements I {[| |]}

verify.codeFix({
    description: "Implement interface 'I'",
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

/// <reference path='fourslash.ts' />

////interface I {
////    f(i: any): i is I;
////    f(): this is I;
////}
////
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`interface I {
    f(i: any): i is I;
    f(): this is I;
}

class C implements I {
    f(i: any): i is I;
    f(): this is I;
    f(i?: any) {
        throw new Error("Method not implemented.");
    }
}`,
});

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

class C implements I {\r
    f(i: any): i is I;\r
    f(): this is I;\r
    f(i?: any) {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});

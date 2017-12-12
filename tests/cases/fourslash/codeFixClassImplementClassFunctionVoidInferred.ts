/// <reference path='fourslash.ts' />

////class A {
////    f() {}
////}
////
////class B implements A {[| |]}

verify.codeFix({
    description: "Implement interface 'A'",
    // TODO: GH#18445
    newFileContent:
`class A {
    f() {}
}

class B implements A {\r
    f(): void {\r
        throw new Error("Method not implemented.");\r
    }\r
}`,
});

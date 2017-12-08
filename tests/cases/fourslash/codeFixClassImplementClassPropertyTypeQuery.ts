/// <reference path='fourslash.ts' />

////class A {
////    A: typeof A;
////}
////class D implements A {[| |]}

verify.codeFix({
    description: "Implement interface 'A'",
    // TODO: GH#18445
    newFileContent:
`class A {
    A: typeof A;
}
class D implements A {\r
    A: typeof A;\r
}`,
});

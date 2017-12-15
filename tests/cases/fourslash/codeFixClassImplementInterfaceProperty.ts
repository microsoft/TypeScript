/// <reference path='fourslash.ts' />

// @lib: es2017

////enum E { a,b,c }
////interface I {
////    x: E;
////    y: E.a
////    z: symbol;
////    w: object;
////}
////class C implements I {}

verify.codeFix({
    description: "Implement interface 'I'",
    // TODO: GH#18445
    newFileContent:
`enum E { a,b,c }
interface I {
    x: E;
    y: E.a
    z: symbol;
    w: object;
}
class C implements I {\r
    x: E;\r
    y: E.a;\r
    z: symbol;\r
    w: object;\r
}`,
});

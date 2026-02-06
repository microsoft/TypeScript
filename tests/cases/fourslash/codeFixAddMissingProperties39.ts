/// <reference path='fourslash.ts' />

////class A {
////    constructor() {}
////}
////
////abstract class B {}
////
////class C {
////   constructor(a: string, b: number, c: A) {}
////}
////
////interface I {
////    a: A;
////    b: B;
////    c: C;
////}
////[|const foo = {} satisfies I;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo = {
    a: new A,
    b: undefined,
    c: undefined
} satisfies I;`
});

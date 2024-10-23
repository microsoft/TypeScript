/// <reference path='fourslash.ts' />

////enum E1 {
////    A, B
////}
////enum E2 {
////    A
////}
////enum E3 {
////}
////interface I {
////    x: E1;
////    y: E2;
////    z: E3;
////}
////[|const foo = {} satisfies I;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo = {
    x: E1.A,
    y: E2.A,
    z: 0
} satisfies I;`
});

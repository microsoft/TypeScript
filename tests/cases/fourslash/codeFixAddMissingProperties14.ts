/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: number;
////}
////function f(a: number, b: number, c: Foo) {}
////[|f(1, 2, {})|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`f(1, 2, {
    a: 0,
    b: 0
})`
});

/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: number;
////}
////function f(foo: Foo) {}
////[|f({})|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`f({
    a: 0,
    b: 0
})`
});

/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: string;
////}
////[|function fn(foo: Foo = {}) {
////}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`function fn(foo: Foo = {
    a: 0,
    b: ""
}) {
}`
});

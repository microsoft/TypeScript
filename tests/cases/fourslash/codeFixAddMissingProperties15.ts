/// <reference path='fourslash.ts' />

////interface Foo {
////    1: number;
////    2: number;
////}
////[|const foo: Foo = {}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo: Foo = {
    1: 0,
    2: 0
}`
});

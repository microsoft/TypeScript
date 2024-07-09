/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: string;
////}
////[|const foo: Foo = { a: 10 }|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo: Foo = {
    a: 10,
    b: ""
}`
});

/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: string;
////}
////[|const foo = { a: 10 } satisfies Foo;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo = {
    a: 10,
    b: ""
} satisfies Foo;`
});

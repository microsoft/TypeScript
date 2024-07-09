/// <reference path='fourslash.ts' />

////interface Foo {
////    a: `--${string}`;
////    b: string;
////    c: "a" | "b"
////}
////[|const foo: Foo = {}|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    preferences: {
        quotePreference: "single"
    },
    newRangeContent:
`const foo: Foo = {
    a: '',
    b: '',
    c: 'a'
}`
});

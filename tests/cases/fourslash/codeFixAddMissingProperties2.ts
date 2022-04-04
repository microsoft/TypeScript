/// <reference path='fourslash.ts' />

////interface Foo {
////    a: number;
////    b: string;
////    c: any;
////}
////[|class C {
////    public c: Foo = {};
////}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`class C {
    public c: Foo = {
        a: 0,
        b: "",
        c: undefined
    };
}`
});

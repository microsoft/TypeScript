/// <reference path="fourslash.ts" />

////interface Foo {
////    a: number;
////    b: string;
////}
////
////interface Bar {
////    value: Foo;
////}
////
////[|const bar: Bar = {
////    value: {
////        a: 10
////    }
////}|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const bar: Bar = {
    value: {
        a: 10,
        b: ""
    }
}`,
});

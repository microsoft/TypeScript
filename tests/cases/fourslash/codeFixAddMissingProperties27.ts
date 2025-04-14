/// <reference path="fourslash.ts" />

////interface Foo {
////    a?: boolean;
////    b: boolean;
////}
////type A = { [K in keyof Foo]-?: { name: K, value: `Foo ${Uppercase<K>}` }}
////[|const a: A = {};|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const a: A = {
    a: {
        name: "a",
        value: "Foo A"
    },
    b: {
        name: "b",
        value: "Foo B"
    }
};`,
});

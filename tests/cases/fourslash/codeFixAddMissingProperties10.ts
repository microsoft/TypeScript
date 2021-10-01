/// <reference path='fourslash.ts' />

////type T = { x: number; };
////interface I {
////    a: T
////}
////[|const foo: I = {};|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo: I = {
    a: {
        x: 0
    }
};`
});

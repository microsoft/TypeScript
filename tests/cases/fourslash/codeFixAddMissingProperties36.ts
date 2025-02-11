/// <reference path='fourslash.ts' />

////type T = {
////    a: null;
////}
////
////[|const foo = {} satisfies T;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo = {
    a: null
} satisfies T;`
});

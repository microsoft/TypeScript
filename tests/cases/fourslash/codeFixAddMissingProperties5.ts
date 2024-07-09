/// <reference path='fourslash.ts' />

////type T = {
////    a: null;
////}
////
////[|const foo: T = {}|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo: T = {
    a: null
}`
});

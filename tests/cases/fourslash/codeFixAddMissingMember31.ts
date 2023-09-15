/// <reference path='fourslash.ts' />

////class C {
////    "new"(x: number) {}
////}
////[|const foo: C = {}|];

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo: C = {
    new: function(x: number): void {
        throw new Error("Function not implemented.");
    }
}`
});

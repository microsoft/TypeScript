/// <reference path='fourslash.ts' />

////interface I {
////    x: number;
////    y: number;
////}
////class C {
////    public p: number;
////    m(x: number, y: I) {}
////}
////[|const foo = {} satisfies C;|]

verify.codeFix({
    index: 0,
    description: ts.Diagnostics.Add_missing_properties.message,
    newRangeContent:
`const foo = {
    p: 0,
    m: function(x: number, y: I): void {
        throw new Error("Function not implemented.");
    }
} satisfies C;`
});

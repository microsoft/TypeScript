/// <reference path='fourslash.ts' />

////interface Test {
////    foo: string;
////    bar(a: string): void;
////}
////function f (_spec: any) {}
////function g (_spec: Test) {}
////[|f(() => {
////    g({});
////});|]

verify.codeFix({
  index: 2,
  description: ts.Diagnostics.Add_missing_properties.message,
  newRangeContent:
`f(() => {
    g({
        foo: "",
        bar: function(a: string): void {
            throw new Error("Function not implemented.");
        }
    });
});`});

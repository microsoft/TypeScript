/// <reference path="fourslash.ts" />

////class C {
////   [|private p = () => {}|]
////   m(a: boolean) {
////       this.p(a);
////   }
////}

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "p"],
    index: 0,
    newRangeContent: "private p = (a: boolean) => {}"
});

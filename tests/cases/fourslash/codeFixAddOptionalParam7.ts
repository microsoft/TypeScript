/// <reference path="fourslash.ts" />

////class C {
////    [|m1() {}|]
////    m2(a: boolean) {
////        this.m1(a);
////    }
////}

verify.codeFix({
    description: [ts.Diagnostics.Add_optional_parameter_to_0.message, "m1"],
    index: 1,
    newRangeContent: "m1(a?: boolean) {}"
});

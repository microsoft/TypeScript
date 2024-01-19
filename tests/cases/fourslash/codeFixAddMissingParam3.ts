/// <reference path="fourslash.ts" />

////class C {
////    private a = 1;
////
////    [|m1() {}|]
////    m2() {
////        this.m1(this.a);
////    }
////}

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "m1"],
    index: 0,
    newRangeContent: "m1(a: number) {}"
});

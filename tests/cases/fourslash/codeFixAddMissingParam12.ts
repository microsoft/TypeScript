/// <reference path="fourslash.ts" />

////function f([|cb = () => {}|]) {
////    cb("");
////}

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "cb"],
    index: 0,
    newRangeContent: "cb = (p0: string) => {}"
});

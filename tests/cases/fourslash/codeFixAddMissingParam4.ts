/// <reference path="fourslash.ts" />

////[|function f() {}|]
////
////f("");

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "f"],
    index: 0,
    newRangeContent: "function f(p0: string) {}"
});

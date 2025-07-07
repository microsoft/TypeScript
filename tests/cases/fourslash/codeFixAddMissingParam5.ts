/// <reference path="fourslash.ts" />

////[|const f = function () {}|]
////
////f("");

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameter_to_0.message, "f"],
    index: 0,
    newRangeContent: "const f = function (p0: string) {}"
});

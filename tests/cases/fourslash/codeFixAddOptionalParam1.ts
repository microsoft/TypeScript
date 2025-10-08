/// <reference path="fourslash.ts" />

////[|function f() {}|]
////
////const a = 1;
////f(a);

verify.codeFix({
    description: [ts.Diagnostics.Add_optional_parameter_to_0.message, "f"],
    index: 1,
    newRangeContent: "function f(a?: number) {}"
});

/// <reference path="fourslash.ts" />

////[|function f() {}|]
////
////const a = 1;
////const b = "";
////f(a, b, true);

verify.codeFix({
    description: [ts.Diagnostics.Add_optional_parameters_to_0.message, "f"],
    index: 1,
    newRangeContent: "function f(a?: number, b?: string, p0?: boolean) {}"
});

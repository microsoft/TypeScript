/// <reference path="fourslash.ts" />

////[|function f() {}|]
////f("", { x: 1 }, [ "" ], true);

verify.codeFix({
    description: [ts.Diagnostics.Add_missing_parameters_to_0.message, "f"],
    index: 0,
    newRangeContent: "function f(p0: string, p1: { x: number; }, p2: string[], p3: boolean) {}"
});

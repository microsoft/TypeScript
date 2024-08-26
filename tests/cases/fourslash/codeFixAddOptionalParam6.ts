/// <reference path="fourslash.ts" />

////[|const f = () => {}|]
////
////f("");

verify.codeFix({
    description: [ts.Diagnostics.Add_optional_parameter_to_0.message, "f"],
    index: 1,
    newRangeContent: "const f = (p0?: string) => {}"
});

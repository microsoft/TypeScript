/// <reference path="fourslash.ts" />

////const o = {
////    a: 1,
////    [|.|]/**/
////[|}|];

verify.getSyntacticDiagnostics(test.ranges().map((range): FourSlashInterface.Diagnostic =>
    ({ code: 1003, message: "Identifier expected.", range })));
verify.completions({ marker: "", exact: undefined });

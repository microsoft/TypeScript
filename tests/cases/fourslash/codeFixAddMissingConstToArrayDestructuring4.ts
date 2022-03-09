/// <reference path='fourslash.ts' />

////[x, y()] = [0, () => 1];

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "y"],
    newFileContent:
`[x, y()] = [0, () => 1];

function y() {
    throw new Error("Function not implemented.");
}
`
});
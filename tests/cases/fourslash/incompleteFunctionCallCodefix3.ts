/// <reference path='fourslash.ts' />

// @noImplicitAny: true
//// function ...q) {}} f(10);

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "f"],
    newFileContent:
`function ...q) {}} f(10);

function f(arg0: number) {
    throw new Error("Function not implemented.");
}
`
});
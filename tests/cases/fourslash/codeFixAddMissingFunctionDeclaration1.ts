/// <reference path='fourslash.ts' />

////foo();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    newFileContent:
`foo();

function foo() {
    throw new Error("Function not implemented.");
}
`
});

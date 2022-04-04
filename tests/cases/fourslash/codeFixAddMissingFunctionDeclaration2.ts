/// <reference path='fourslash.ts' />

////foo();
////foo();
////foo();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    applyChanges: true,
    newFileContent:
`foo();
foo();
foo();

function foo() {
    throw new Error("Function not implemented.");
}
`
});

verify.not.codeFixAvailable();

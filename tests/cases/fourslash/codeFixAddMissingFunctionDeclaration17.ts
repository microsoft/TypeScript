/// <reference path='fourslash.ts' />

////// comment
////foo();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    newFileContent:
`// comment
foo();

function foo() {
    throw new Error("Function not implemented.");
}
`
});

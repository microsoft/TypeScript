/// <reference path='fourslash.ts' />

////foo<string, number>();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    newFileContent:
`foo<string, number>();

function foo<T, U>() {
    throw new Error("Function not implemented.");
}
`
});

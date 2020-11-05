/// <reference path='fourslash.ts' />

////const test: string = foo();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    newFileContent:
`const test: string = foo();

function foo(): string {
    throw new Error("Function not implemented.");
}
`
});

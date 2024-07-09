/// <reference path='fourslash.ts' />

////foo(1, "", { x: 1, y: 1 });

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "foo"],
    newFileContent:
`foo(1, "", { x: 1, y: 1 });

function foo(arg0: number, arg1: string, arg2: { x: number; y: number; }) {
    throw new Error("Function not implemented.");
}
`
});

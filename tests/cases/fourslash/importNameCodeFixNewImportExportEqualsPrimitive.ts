/// <reference path="fourslash.ts" />

////[|valueOf/*0*/();|]

// @Filename: foo.ts
////declare var x: number;
////export = x;

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "valueOf"],
    newFileContent:
`valueOf();

function valueOf() {
    throw new Error("Function not implemented.");
}
`
});
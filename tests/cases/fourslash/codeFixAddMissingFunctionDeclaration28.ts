/// <reference path="fourslash.ts" />

// @strict: true
////const notexistent = notExistent();

verify.codeFix({
    index: 1,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "notExistent"],
    newFileContent:
`const notexistent = notExistent();

function notExistent() {
    throw new Error("Function not implemented.");
}
`
});

//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsWithImportHelpers.ts] ////

//// [awaitUsingDeclarationsWithImportHelpers.ts]
export {};

async function f() {
    await using a = null;
}

//// [awaitUsingDeclarationsWithImportHelpers.js]
async function f() {
    await using a = null;
}
export {};

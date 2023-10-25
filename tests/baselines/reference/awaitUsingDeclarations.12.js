//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.12.ts] ////

//// [awaitUsingDeclarations.12.ts]
async function f() {
    await using x = {};
}

//// [awaitUsingDeclarations.12.js]
async function f() {
    await using x = {};
}

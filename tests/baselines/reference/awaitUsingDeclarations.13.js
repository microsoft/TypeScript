//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.13.ts] ////

//// [awaitUsingDeclarations.13.ts]
await using x = null;

function f() {
    await using x = null;
}

//// [awaitUsingDeclarations.13.js]
await using x = null;
function f() {
    await using x = null;
}

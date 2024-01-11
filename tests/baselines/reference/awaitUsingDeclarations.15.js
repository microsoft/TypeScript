//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.15.ts] ////

//// [awaitUsingDeclarations.15.ts]
async function f() {
    await using _ = { async [Symbol.asyncDispose]() {} };
}

//// [awaitUsingDeclarations.15.js]
async function f() {
    await using _ = { async [Symbol.asyncDispose]() { } };
}

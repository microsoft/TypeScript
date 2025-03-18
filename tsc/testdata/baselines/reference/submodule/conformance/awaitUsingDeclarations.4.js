//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.4.ts] ////

//// [awaitUsingDeclarations.4.ts]
{
    await using [a] = null;
}

export {};

//// [awaitUsingDeclarations.4.js]
{
    await using[a];
    null;
}
export {};

//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.6.ts] ////

//// [awaitUsingDeclarations.6.ts]
{
    await using {a} = null;
}


export {};

//// [awaitUsingDeclarations.6.js]
{
    await using { a } = null;
}
export {};

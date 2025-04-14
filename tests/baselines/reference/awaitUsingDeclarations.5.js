//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.5.ts] ////

//// [awaitUsingDeclarations.5.ts]
{
    await using a = null,
                [b] = null,
                c = null;
}

export {};

//// [awaitUsingDeclarations.5.js]
{
    await using a = null, [b] = null, c = null;
}
export {};

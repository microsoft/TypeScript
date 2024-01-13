//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarations.7.ts] ////

//// [awaitUsingDeclarations.7.ts]
{
    await using a = null,
                {b} = null,
                c = null;
}

//// [awaitUsingDeclarations.7.js]
{
    await using a = null, { b } = null, c = null;
}

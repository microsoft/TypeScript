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

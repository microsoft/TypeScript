//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsInForOf.4.ts] ////

//// [awaitUsingDeclarationsInForOf.4.ts]
// https://github.com/microsoft/TypeScript/issues/55555

{
  for (await using of of of) {};
}


//// [awaitUsingDeclarationsInForOf.4.js]
// https://github.com/microsoft/TypeScript/issues/55555
{
    for (await using of of of) { }
    ;
}

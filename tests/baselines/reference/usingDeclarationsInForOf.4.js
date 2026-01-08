//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForOf.4.ts] ////

//// [usingDeclarationsInForOf.4.ts]
for (using of = null;;) break;
for (using of: null = null;;) break;
for (using of;;) break;


//// [usingDeclarationsInForOf.4.js]
for (using of = null;;)
    break;
for (using of = null;;)
    break;
for (using of;;)
    break;

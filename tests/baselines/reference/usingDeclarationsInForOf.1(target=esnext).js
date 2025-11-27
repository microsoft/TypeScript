//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForOf.1.ts] ////

//// [usingDeclarationsInForOf.1.ts]
for (using d1 of [{ [Symbol.dispose]() {} }, null, undefined]) {
}


//// [usingDeclarationsInForOf.1.js]
for (using d1 of [{ [Symbol.dispose]() { } }, null, undefined]) {
}

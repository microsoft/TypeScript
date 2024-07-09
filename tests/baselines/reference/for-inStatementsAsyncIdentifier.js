//// [tests/cases/conformance/statements/for-inStatements/for-inStatementsAsyncIdentifier.ts] ////

//// [for-inStatementsAsyncIdentifier.ts]
var async;
for (async in { a: 1, b: 2 }) {}


//// [for-inStatementsAsyncIdentifier.js]
var async;
for (async in { a: 1, b: 2 }) { }

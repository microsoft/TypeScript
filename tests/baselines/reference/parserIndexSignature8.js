//// [tests/cases/conformance/parser/ecmascript5/IndexSignatures/parserIndexSignature8.ts] ////

//// [parserIndexSignature8.ts]
var foo: { [index: any]; }; // expect an error here
var foo2: { [index: RegExp]; }; // expect an error here


//// [parserIndexSignature8.js]
var foo; // expect an error here
var foo2; // expect an error here

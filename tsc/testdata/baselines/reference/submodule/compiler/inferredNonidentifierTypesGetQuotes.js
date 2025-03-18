//// [tests/cases/compiler/inferredNonidentifierTypesGetQuotes.ts] ////

//// [inferredNonidentifierTypesGetQuotes.ts]
var x = [{ "a-b": "string" }, {}];

var y = [{ ["a-b"]: "string" }, {}];

//// [inferredNonidentifierTypesGetQuotes.js]
var x = [{ "a-b": "string" }, {}];
var y = [{ ["a-b"]: "string" }, {}];

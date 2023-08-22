//// [tests/cases/conformance/parser/ecmascript6/ShorthandPropertyAssignment/parserShorthandPropertyAssignment5.ts] ////

//// [parserShorthandPropertyAssignment5.ts]
var greet = "hello";
var obj = { greet? }; 

//// [parserShorthandPropertyAssignment5.js]
var greet = "hello";
var obj = { greet: greet };

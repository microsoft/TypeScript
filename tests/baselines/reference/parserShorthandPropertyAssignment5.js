//// [parserShorthandPropertyAssignment5.ts]
var greet = "hello";
var obj = { greet? }; 

//// [parserShorthandPropertyAssignment5.js]
var greet = "hello";
var obj = { greet: greet };

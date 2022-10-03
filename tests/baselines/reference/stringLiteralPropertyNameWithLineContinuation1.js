//// [stringLiteralPropertyNameWithLineContinuation1.ts]
var x = {'text\
':'hello'}
x.text = "bar"


//// [stringLiteralPropertyNameWithLineContinuation1.js]
var x = { 'text\
': 'hello' };
x.text = "bar";

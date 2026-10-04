//// [tests/cases/compiler/stringLiteralPropertyNameWithLineContinuation1.ts] ////

//// [stringLiteralPropertyNameWithLineContinuation1.ts]
var x = {'text\
':'hello'}
x.text = "bar"


//// [stringLiteralPropertyNameWithLineContinuation1.js]
"use strict";
var x = { 'text\
': 'hello' };
x.text = "bar";

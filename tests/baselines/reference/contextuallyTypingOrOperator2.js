//// [tests/cases/compiler/contextuallyTypingOrOperator2.ts] ////

//// [contextuallyTypingOrOperator2.ts]
var v: { a: (_: string) => number } = { a: s => s.length } || { a: s => 1 };

var v2 = (s: string) => s.length || function (s) { s.aaa };

//// [contextuallyTypingOrOperator2.js]
var v = { a: s => s.length } || { a: s => 1 };
var v2 = (s) => s.length || function (s) { s.aaa; };

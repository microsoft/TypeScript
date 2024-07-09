//// [tests/cases/conformance/expressions/typeGuards/typePredicateOnVariableDeclaration01.ts] ////

//// [typePredicateOnVariableDeclaration01.ts]
var x: this is string;

//// [typePredicateOnVariableDeclaration01.js]
var x;


//// [typePredicateOnVariableDeclaration01.d.ts]
declare var x: this is string;

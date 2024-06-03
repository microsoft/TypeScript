//// [tests/cases/conformance/expressions/typeGuards/typePredicateOnVariableDeclaration02.ts] ////

//// [typePredicateOnVariableDeclaration02.ts]
var y: z is number;

//// [typePredicateOnVariableDeclaration02.js]
var y, is, number;


//// [typePredicateOnVariableDeclaration02.d.ts]
declare var y: z, is: any, number: any;

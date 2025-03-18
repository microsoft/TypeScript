//// [tests/cases/conformance/expressions/unaryOperators/plusOperator/plusOperatorInvalidOperations.ts] ////

//// [plusOperatorInvalidOperations.ts]
// Unary operator +
var b;

// operand before +
var result1 = b+;   //expect error

// miss  an operand
var result2 =+;

//// [plusOperatorInvalidOperations.js]
var b;
var result1 = b + ;
var result2 = +;

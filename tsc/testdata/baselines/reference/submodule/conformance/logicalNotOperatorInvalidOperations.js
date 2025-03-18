//// [tests/cases/conformance/expressions/unaryOperators/logicalNotOperator/logicalNotOperatorInvalidOperations.ts] ////

//// [logicalNotOperatorInvalidOperations.ts]
// Unary operator !
var b: number;

// operand before !
var BOOLEAN1 = b!;  //expect error

// miss parentheses
var BOOLEAN2 = !b + b;

// miss an operand
var BOOLEAN3 =!;

//// [logicalNotOperatorInvalidOperations.js]
var b;
var BOOLEAN1 = b;
var BOOLEAN2 = !b + b;
var BOOLEAN3 = !;

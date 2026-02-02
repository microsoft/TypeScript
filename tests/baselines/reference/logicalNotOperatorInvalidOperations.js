//// [tests/cases/conformance/expressions/unaryOperators/logicalNotOperator/logicalNotOperatorInvalidOperations.ts] ////

//// [logicalNotOperatorInvalidOperations.ts]
// Unary operator !
declare var b: number;

// operand before !
var BOOLEAN1 = b!;  //expect error

// miss parentheses
var BOOLEAN2 = !b + b;

// miss an operand
var BOOLEAN3 =!;

//// [logicalNotOperatorInvalidOperations.js]
// operand before !
var BOOLEAN1 = b; //expect error
// miss parentheses
var BOOLEAN2 = !b + b;
// miss an operand
var BOOLEAN3 = !;

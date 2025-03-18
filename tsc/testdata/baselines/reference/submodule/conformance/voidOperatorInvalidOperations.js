//// [tests/cases/conformance/expressions/unaryOperators/voidOperator/voidOperatorInvalidOperations.ts] ////

//// [voidOperatorInvalidOperations.ts]
// Unary operator void

// operand before void
var ANY = ANY void ;    //expect error

// miss an operand
var ANY1 = void ;

//// [voidOperatorInvalidOperations.js]
var ANY = ANY;
void ;
var ANY1 = void ;

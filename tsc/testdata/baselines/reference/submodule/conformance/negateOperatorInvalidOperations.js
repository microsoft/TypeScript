//// [tests/cases/conformance/expressions/unaryOperators/negateOperator/negateOperatorInvalidOperations.ts] ////

//// [negateOperatorInvalidOperations.ts]
// Unary operator -

// operand before -
var NUMBER1 = var NUMBER-;  //expect error

// invalid expressions
var NUMBER2 = -(null - undefined);
var NUMBER3 = -(null - null);
var NUMBER4 = -(undefined - undefined);

// miss operand
var NUMBER =-;

//// [negateOperatorInvalidOperations.js]
var NUMBER1 = ;
var NUMBER;
-;
var NUMBER2 = -(null - undefined);
var NUMBER3 = -(null - null);
var NUMBER4 = -(undefined - undefined);
var NUMBER = -;

//// [tests/cases/conformance/expressions/unaryOperators/typeofOperator/typeofOperatorInvalidOperations.ts] ////

//// [typeofOperatorInvalidOperations.ts]
// Unary operator typeof

// opreand before typeof
var ANY = ANY typeof ;    //expect error

// miss an operand
var ANY1 = typeof ;

//// [typeofOperatorInvalidOperations.js]
"use strict";
// Unary operator typeof
// opreand before typeof
var ANY = ANY;
typeof ; //expect error
// miss an operand
var ANY1 = typeof ;

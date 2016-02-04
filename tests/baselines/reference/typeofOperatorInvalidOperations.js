//// [typeofOperatorInvalidOperations.ts]
// Unary operator typeof

// operand before typeof
var ANY = ANY typeof ;    //expect error

// miss an operand
var ANY1 = typeof ;

//// [typeofOperatorInvalidOperations.js]
// Unary operator typeof
// operand before typeof
var ANY = ANY;
typeof ; //expect error
// miss an operand
var ANY1 = typeof ;

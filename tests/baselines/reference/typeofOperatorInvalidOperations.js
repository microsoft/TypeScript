//// [typeofOperatorInvalidOperations.ts]
// Unary operator typeof

// opreand before typeof
var ANY = ANY typeof ;    //expect error

// miss an operand
var ANY1 = typeof ;

//// [typeofOperatorInvalidOperations.js]
// Unary operator typeof
// opreand before typeof
var ANY = ANY;
typeof ; //expect error
// miss an operand
var ANY1 = typeof ;

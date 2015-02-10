//// [plusOperatorInvalidOperations.ts]
// Unary operator +
var b;

// operand before +
var result1 = b+;   //expect error

// miss  an operand
var result2 =+;

//// [plusOperatorInvalidOperations.js]
// Unary operator +
var b;
// operand before +
var result1 = b + ; //expect error
// miss  an operand
var result2 = +;

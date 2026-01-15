// Unary operator !
declare var b: number;

// operand before !
var BOOLEAN1 = b!;  //expect error

// miss parentheses
var BOOLEAN2 = !b + b;

// miss an operand
var BOOLEAN3 =!;
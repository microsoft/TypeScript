// Unary operator ~
var q;

// operand before ~
var a = q~;  //expect error

// multiple operands after ~
var mul = ~[1, 2, "abc"], "";  //expect error

// miss an operand
var b =~;
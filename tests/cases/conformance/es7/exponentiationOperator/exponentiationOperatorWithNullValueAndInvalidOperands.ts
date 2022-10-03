// If one operand is the null or undefined value, it is treated as having the type of the
// other operand.

var a: boolean;
var b: string;
var c: Object;

// operator **
var r1a1 = null ** a;
var r1a2 = null ** b;
var r1a3 = null ** c;

var r1b1 = a ** null;
var r1b2 = b ** null;
var r1b3 = c ** null;

var r1c1 = null ** true;
var r1c2 = null ** '';
var r1c3 = null ** {};

var r1d1 = true ** null;
var r1d2 = '' ** null;
var r1d3 = {} ** null;
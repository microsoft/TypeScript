// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.

var a: boolean;
var b: string;
var c: Object;

// operator **
var r1a1 = undefined ** a;
var r1a2 = undefined ** b;
var r1a3 = undefined ** c;

var r1b1 = a ** undefined;
var r1b2 = b ** undefined;
var r1b3 = c ** undefined;

var r1c1 = undefined ** true;
var r1c2 = undefined ** '';
var r1c3 = undefined ** {};

var r1d1 = true ** undefined;
var r1d2 = '' ** undefined;
var r1d3 = {} ** undefined;
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.

enum E {
    a,
    b
}

var a: any;
var b: number;

// operator *
var rk1 = undefined ** a;
var rk2 = undefined ** b;
var rk3 = undefined ** 1;
var rk4 = undefined ** E.a;
var rk5 = a ** undefined;
var rk6 = b ** undefined;
var rk7 = 0 ** undefined;
var rk8 = E.b ** undefined;
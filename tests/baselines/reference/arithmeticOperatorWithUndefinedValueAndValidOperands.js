//// [tests/cases/conformance/expressions/binaryOperators/arithmeticOperator/arithmeticOperatorWithUndefinedValueAndValidOperands.ts] ////

//// [arithmeticOperatorWithUndefinedValueAndValidOperands.ts]
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.

enum E {
    a,
    b
}

var a: any;
var b: number;

// operator *
var ra1 = undefined * a;
var ra2 = undefined * b;
var ra3 = undefined * 1;
var ra4 = undefined * E.a;
var ra5 = a * undefined;
var ra6 = b * undefined;
var ra7 = 0 * undefined;
var ra8 = E.b * undefined;

// operator /
var rb1 = undefined / a;
var rb2 = undefined / b;
var rb3 = undefined / 1;
var rb4 = undefined / E.a;
var rb5 = a / undefined;
var rb6 = b / undefined;
var rb7 = 0 / undefined;
var rb8 = E.b / undefined;

// operator %
var rc1 = undefined % a;
var rc2 = undefined % b;
var rc3 = undefined % 1;
var rc4 = undefined % E.a;
var rc5 = a % undefined;
var rc6 = b % undefined;
var rc7 = 0 % undefined;
var rc8 = E.b % undefined;

// operator -
var rd1 = undefined - a;
var rd2 = undefined - b;
var rd3 = undefined - 1;
var rd4 = undefined - E.a;
var rd5 = a - undefined;
var rd6 = b - undefined;
var rd7 = 0 - undefined;
var rd8 = E.b - undefined;

// operator <<
var re1 = undefined << a;
var re2 = undefined << b;
var re3 = undefined << 1;
var re4 = undefined << E.a;
var re5 = a << undefined;
var re6 = b << undefined;
var re7 = 0 << undefined;
var re8 = E.b << undefined;

// operator >>
var rf1 = undefined >> a;
var rf2 = undefined >> b;
var rf3 = undefined >> 1;
var rf4 = undefined >> E.a;
var rf5 = a >> undefined;
var rf6 = b >> undefined;
var rf7 = 0 >> undefined;
var rf8 = E.b >> undefined;

// operator >>>
var rg1 = undefined >>> a;
var rg2 = undefined >>> b;
var rg3 = undefined >>> 1;
var rg4 = undefined >>> E.a;
var rg5 = a >>> undefined;
var rg6 = b >>> undefined;
var rg7 = 0 >>> undefined;
var rg8 = E.b >>> undefined;

// operator &
var rh1 = undefined & a;
var rh2 = undefined & b;
var rh3 = undefined & 1;
var rh4 = undefined & E.a;
var rh5 = a & undefined;
var rh6 = b & undefined;
var rh7 = 0 & undefined;
var rh8 = E.b & undefined;

// operator ^
var ri1 = undefined ^ a;
var ri2 = undefined ^ b;
var ri3 = undefined ^ 1;
var ri4 = undefined ^ E.a;
var ri5 = a ^ undefined;
var ri6 = b ^ undefined;
var ri7 = 0 ^ undefined;
var ri8 = E.b ^ undefined;

// operator |
var rj1 = undefined | a;
var rj2 = undefined | b;
var rj3 = undefined | 1;
var rj4 = undefined | E.a;
var rj5 = a | undefined;
var rj6 = b | undefined;
var rj7 = 0 | undefined;
var rj8 = E.b | undefined;

//// [arithmeticOperatorWithUndefinedValueAndValidOperands.js]
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var a;
var b;
// operator *
var ra1 = undefined * a;
var ra2 = undefined * b;
var ra3 = undefined * 1;
var ra4 = undefined * E.a;
var ra5 = a * undefined;
var ra6 = b * undefined;
var ra7 = 0 * undefined;
var ra8 = E.b * undefined;
// operator /
var rb1 = undefined / a;
var rb2 = undefined / b;
var rb3 = undefined / 1;
var rb4 = undefined / E.a;
var rb5 = a / undefined;
var rb6 = b / undefined;
var rb7 = 0 / undefined;
var rb8 = E.b / undefined;
// operator %
var rc1 = undefined % a;
var rc2 = undefined % b;
var rc3 = undefined % 1;
var rc4 = undefined % E.a;
var rc5 = a % undefined;
var rc6 = b % undefined;
var rc7 = 0 % undefined;
var rc8 = E.b % undefined;
// operator -
var rd1 = undefined - a;
var rd2 = undefined - b;
var rd3 = undefined - 1;
var rd4 = undefined - E.a;
var rd5 = a - undefined;
var rd6 = b - undefined;
var rd7 = 0 - undefined;
var rd8 = E.b - undefined;
// operator <<
var re1 = undefined << a;
var re2 = undefined << b;
var re3 = undefined << 1;
var re4 = undefined << E.a;
var re5 = a << undefined;
var re6 = b << undefined;
var re7 = 0 << undefined;
var re8 = E.b << undefined;
// operator >>
var rf1 = undefined >> a;
var rf2 = undefined >> b;
var rf3 = undefined >> 1;
var rf4 = undefined >> E.a;
var rf5 = a >> undefined;
var rf6 = b >> undefined;
var rf7 = 0 >> undefined;
var rf8 = E.b >> undefined;
// operator >>>
var rg1 = undefined >>> a;
var rg2 = undefined >>> b;
var rg3 = undefined >>> 1;
var rg4 = undefined >>> E.a;
var rg5 = a >>> undefined;
var rg6 = b >>> undefined;
var rg7 = 0 >>> undefined;
var rg8 = E.b >>> undefined;
// operator &
var rh1 = undefined & a;
var rh2 = undefined & b;
var rh3 = undefined & 1;
var rh4 = undefined & E.a;
var rh5 = a & undefined;
var rh6 = b & undefined;
var rh7 = 0 & undefined;
var rh8 = E.b & undefined;
// operator ^
var ri1 = undefined ^ a;
var ri2 = undefined ^ b;
var ri3 = undefined ^ 1;
var ri4 = undefined ^ E.a;
var ri5 = a ^ undefined;
var ri6 = b ^ undefined;
var ri7 = 0 ^ undefined;
var ri8 = E.b ^ undefined;
// operator |
var rj1 = undefined | a;
var rj2 = undefined | b;
var rj3 = undefined | 1;
var rj4 = undefined | E.a;
var rj5 = a | undefined;
var rj6 = b | undefined;
var rj7 = 0 | undefined;
var rj8 = E.b | undefined;

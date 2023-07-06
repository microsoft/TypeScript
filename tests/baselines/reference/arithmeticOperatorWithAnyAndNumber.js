//// [tests/cases/conformance/expressions/binaryOperators/arithmeticOperator/arithmeticOperatorWithAnyAndNumber.ts] ////

//// [arithmeticOperatorWithAnyAndNumber.ts]
var a: any;
var b: number;

// operator *
var ra1 = a * a;
var ra2 = a * b;
var ra3 = a * 0;
var ra4 = 0 * a;
var ra5 = 0 * 0;
var ra6 = b * 0;
var ra7 = 0 * b;
var ra8 = b * b;

// operator /
var rb1 = a / a;
var rb2 = a / b;
var rb3 = a / 0;
var rb4 = 0 / a;
var rb5 = 0 / 0;
var rb6 = b / 0;
var rb7 = 0 / b;
var rb8 = b / b;

// operator %
var rc1 = a % a;
var rc2 = a % b;
var rc3 = a % 0;
var rc4 = 0 % a;
var rc5 = 0 % 0;
var rc6 = b % 0;
var rc7 = 0 % b;
var rc8 = b % b;

// operator -
var rd1 = a - a;
var rd2 = a - b;
var rd3 = a - 0;
var rd4 = 0 - a;
var rd5 = 0 - 0;
var rd6 = b - 0;
var rd7 = 0 - b;
var rd8 = b - b;

// operator <<
var re1 = a << a;
var re2 = a << b;
var re3 = a << 0;
var re4 = 0 << a;
var re5 = 0 << 0;
var re6 = b << 0;
var re7 = 0 << b;
var re8 = b << b;

// operator >>
var rf1 = a >> a;
var rf2 = a >> b;
var rf3 = a >> 0;
var rf4 = 0 >> a;
var rf5 = 0 >> 0;
var rf6 = b >> 0;
var rf7 = 0 >> b;
var rf8 = b >> b;

// operator >>>
var rg1 = a >>> a;
var rg2 = a >>> b;
var rg3 = a >>> 0;
var rg4 = 0 >>> a;
var rg5 = 0 >>> 0;
var rg6 = b >>> 0;
var rg7 = 0 >>> b;
var rg8 = b >>> b;

// operator &
var rh1 = a & a;
var rh2 = a & b;
var rh3 = a & 0;
var rh4 = 0 & a;
var rh5 = 0 & 0;
var rh6 = b & 0;
var rh7 = 0 & b;
var rh8 = b & b;

// operator ^
var ri1 = a ^ a;
var ri2 = a ^ b;
var ri3 = a ^ 0;
var ri4 = 0 ^ a;
var ri5 = 0 ^ 0;
var ri6 = b ^ 0;
var ri7 = 0 ^ b;
var ri8 = b ^ b;

// operator |
var rj1 = a | a;
var rj2 = a | b;
var rj3 = a | 0;
var rj4 = 0 | a;
var rj5 = 0 | 0;
var rj6 = b | 0;
var rj7 = 0 | b;
var rj8 = b | b;

//// [arithmeticOperatorWithAnyAndNumber.js]
var a;
var b;
// operator *
var ra1 = a * a;
var ra2 = a * b;
var ra3 = a * 0;
var ra4 = 0 * a;
var ra5 = 0 * 0;
var ra6 = b * 0;
var ra7 = 0 * b;
var ra8 = b * b;
// operator /
var rb1 = a / a;
var rb2 = a / b;
var rb3 = a / 0;
var rb4 = 0 / a;
var rb5 = 0 / 0;
var rb6 = b / 0;
var rb7 = 0 / b;
var rb8 = b / b;
// operator %
var rc1 = a % a;
var rc2 = a % b;
var rc3 = a % 0;
var rc4 = 0 % a;
var rc5 = 0 % 0;
var rc6 = b % 0;
var rc7 = 0 % b;
var rc8 = b % b;
// operator -
var rd1 = a - a;
var rd2 = a - b;
var rd3 = a - 0;
var rd4 = 0 - a;
var rd5 = 0 - 0;
var rd6 = b - 0;
var rd7 = 0 - b;
var rd8 = b - b;
// operator <<
var re1 = a << a;
var re2 = a << b;
var re3 = a << 0;
var re4 = 0 << a;
var re5 = 0 << 0;
var re6 = b << 0;
var re7 = 0 << b;
var re8 = b << b;
// operator >>
var rf1 = a >> a;
var rf2 = a >> b;
var rf3 = a >> 0;
var rf4 = 0 >> a;
var rf5 = 0 >> 0;
var rf6 = b >> 0;
var rf7 = 0 >> b;
var rf8 = b >> b;
// operator >>>
var rg1 = a >>> a;
var rg2 = a >>> b;
var rg3 = a >>> 0;
var rg4 = 0 >>> a;
var rg5 = 0 >>> 0;
var rg6 = b >>> 0;
var rg7 = 0 >>> b;
var rg8 = b >>> b;
// operator &
var rh1 = a & a;
var rh2 = a & b;
var rh3 = a & 0;
var rh4 = 0 & a;
var rh5 = 0 & 0;
var rh6 = b & 0;
var rh7 = 0 & b;
var rh8 = b & b;
// operator ^
var ri1 = a ^ a;
var ri2 = a ^ b;
var ri3 = a ^ 0;
var ri4 = 0 ^ a;
var ri5 = 0 ^ 0;
var ri6 = b ^ 0;
var ri7 = 0 ^ b;
var ri8 = b ^ b;
// operator |
var rj1 = a | a;
var rj2 = a | b;
var rj3 = a | 0;
var rj4 = 0 | a;
var rj5 = 0 | 0;
var rj6 = b | 0;
var rj7 = 0 | b;
var rj8 = b | b;

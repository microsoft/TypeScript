//// [tests/cases/conformance/expressions/binaryOperators/arithmeticOperator/arithmeticOperatorWithNullValueAndInvalidOperands.ts] ////

//// [arithmeticOperatorWithNullValueAndInvalidOperands.ts]
// If one operand is the null or undefined value, it is treated as having the type of the
// other operand.

var a: boolean;
var b: string;
var c: Object;

// operator *
var r1a1 = null * a;
var r1a2 = null * b;
var r1a3 = null * c;

var r1b1 = a * null;
var r1b2 = b * null;
var r1b3 = c * null;

var r1c1 = null * true;
var r1c2 = null * '';
var r1c3 = null * {};

var r1d1 = true * null;
var r1d2 = '' * null;
var r1d3 = {} * null;

// operator /
var r2a1 = null / a;
var r2a2 = null / b;
var r2a3 = null / c;

var r2b1 = a / null;
var r2b2 = b / null;
var r2b3 = c / null;

var r2c1 = null / true;
var r2c2 = null / '';
var r2c3 = null / {};

var r2d1 = true / null;
var r2d2 = '' / null;
var r2d3 = {} / null;

// operator %
var r3a1 = null % a;
var r3a2 = null % b;
var r3a3 = null % c;

var r3b1 = a % null;
var r3b2 = b % null;
var r3b3 = c % null;

var r3c1 = null % true;
var r3c2 = null % '';
var r3c3 = null % {};

var r3d1 = true % null;
var r3d2 = '' % null;
var r3d3 = {} % null;

// operator -
var r4a1 = null - a;
var r4a2 = null - b;
var r4a3 = null - c;

var r4b1 = a - null;
var r4b2 = b - null;
var r4b3 = c - null;

var r4c1 = null - true;
var r4c2 = null - '';
var r4c3 = null - {};

var r4d1 = true - null;
var r4d2 = '' - null;
var r4d3 = {} - null;

// operator <<
var r5a1 = null << a;
var r5a2 = null << b;
var r5a3 = null << c;

var r5b1 = a << null;
var r5b2 = b << null;
var r5b3 = c << null;

var r5c1 = null << true;
var r5c2 = null << '';
var r5c3 = null << {};

var r5d1 = true << null;
var r5d2 = '' << null;
var r5d3 = {} << null;

// operator >>
var r6a1 = null >> a;
var r6a2 = null >> b;
var r6a3 = null >> c;

var r6b1 = a >> null;
var r6b2 = b >> null;
var r6b3 = c >> null;

var r6c1 = null >> true;
var r6c2 = null >> '';
var r6c3 = null >> {};

var r6d1 = true >> null;
var r6d2 = '' >> null;
var r6d3 = {} >> null;

// operator >>>
var r7a1 = null >>> a;
var r7a2 = null >>> b;
var r7a3 = null >>> c;

var r7b1 = a >>> null;
var r7b2 = b >>> null;
var r7b3 = c >>> null;

var r7c1 = null >>> true;
var r7c2 = null >>> '';
var r7c3 = null >>> {};

var r7d1 = true >>> null;
var r7d2 = '' >>> null;
var r7d3 = {} >>> null;

// operator &
var r8a1 = null & a;
var r8a2 = null & b;
var r8a3 = null & c;

var r8b1 = a & null;
var r8b2 = b & null;
var r8b3 = c & null;

var r8c1 = null & true;
var r8c2 = null & '';
var r8c3 = null & {};

var r8d1 = true & null;
var r8d2 = '' & null;
var r8d3 = {} & null;

// operator ^
var r9a1 = null ^ a;
var r9a2 = null ^ b;
var r9a3 = null ^ c;

var r9b1 = a ^ null;
var r9b2 = b ^ null;
var r9b3 = c ^ null;

var r9c1 = null ^ true;
var r9c2 = null ^ '';
var r9c3 = null ^ {};

var r9d1 = true ^ null;
var r9d2 = '' ^ null;
var r9d3 = {} ^ null;

// operator |
var r10a1 = null | a;
var r10a2 = null | b;
var r10a3 = null | c;

var r10b1 = a | null;
var r10b2 = b | null;
var r10b3 = c | null;

var r10c1 = null | true;
var r10c2 = null | '';
var r10c3 = null | {};

var r10d1 = true | null;
var r10d2 = '' | null;
var r10d3 = {} | null;

//// [arithmeticOperatorWithNullValueAndInvalidOperands.js]
// If one operand is the null or undefined value, it is treated as having the type of the
// other operand.
var a;
var b;
var c;
// operator *
var r1a1 = null * a;
var r1a2 = null * b;
var r1a3 = null * c;
var r1b1 = a * null;
var r1b2 = b * null;
var r1b3 = c * null;
var r1c1 = null * true;
var r1c2 = null * '';
var r1c3 = null * {};
var r1d1 = true * null;
var r1d2 = '' * null;
var r1d3 = {} * null;
// operator /
var r2a1 = null / a;
var r2a2 = null / b;
var r2a3 = null / c;
var r2b1 = a / null;
var r2b2 = b / null;
var r2b3 = c / null;
var r2c1 = null / true;
var r2c2 = null / '';
var r2c3 = null / {};
var r2d1 = true / null;
var r2d2 = '' / null;
var r2d3 = {} / null;
// operator %
var r3a1 = null % a;
var r3a2 = null % b;
var r3a3 = null % c;
var r3b1 = a % null;
var r3b2 = b % null;
var r3b3 = c % null;
var r3c1 = null % true;
var r3c2 = null % '';
var r3c3 = null % {};
var r3d1 = true % null;
var r3d2 = '' % null;
var r3d3 = {} % null;
// operator -
var r4a1 = null - a;
var r4a2 = null - b;
var r4a3 = null - c;
var r4b1 = a - null;
var r4b2 = b - null;
var r4b3 = c - null;
var r4c1 = null - true;
var r4c2 = null - '';
var r4c3 = null - {};
var r4d1 = true - null;
var r4d2 = '' - null;
var r4d3 = {} - null;
// operator <<
var r5a1 = null << a;
var r5a2 = null << b;
var r5a3 = null << c;
var r5b1 = a << null;
var r5b2 = b << null;
var r5b3 = c << null;
var r5c1 = null << true;
var r5c2 = null << '';
var r5c3 = null << {};
var r5d1 = true << null;
var r5d2 = '' << null;
var r5d3 = {} << null;
// operator >>
var r6a1 = null >> a;
var r6a2 = null >> b;
var r6a3 = null >> c;
var r6b1 = a >> null;
var r6b2 = b >> null;
var r6b3 = c >> null;
var r6c1 = null >> true;
var r6c2 = null >> '';
var r6c3 = null >> {};
var r6d1 = true >> null;
var r6d2 = '' >> null;
var r6d3 = {} >> null;
// operator >>>
var r7a1 = null >>> a;
var r7a2 = null >>> b;
var r7a3 = null >>> c;
var r7b1 = a >>> null;
var r7b2 = b >>> null;
var r7b3 = c >>> null;
var r7c1 = null >>> true;
var r7c2 = null >>> '';
var r7c3 = null >>> {};
var r7d1 = true >>> null;
var r7d2 = '' >>> null;
var r7d3 = {} >>> null;
// operator &
var r8a1 = null & a;
var r8a2 = null & b;
var r8a3 = null & c;
var r8b1 = a & null;
var r8b2 = b & null;
var r8b3 = c & null;
var r8c1 = null & true;
var r8c2 = null & '';
var r8c3 = null & {};
var r8d1 = true & null;
var r8d2 = '' & null;
var r8d3 = {} & null;
// operator ^
var r9a1 = null ^ a;
var r9a2 = null ^ b;
var r9a3 = null ^ c;
var r9b1 = a ^ null;
var r9b2 = b ^ null;
var r9b3 = c ^ null;
var r9c1 = null ^ true;
var r9c2 = null ^ '';
var r9c3 = null ^ {};
var r9d1 = true ^ null;
var r9d2 = '' ^ null;
var r9d3 = {} ^ null;
// operator |
var r10a1 = null | a;
var r10a2 = null | b;
var r10a3 = null | c;
var r10b1 = a | null;
var r10b2 = b | null;
var r10b3 = c | null;
var r10c1 = null | true;
var r10c2 = null | '';
var r10c3 = null | {};
var r10d1 = true | null;
var r10d2 = '' | null;
var r10d3 = {} | null;

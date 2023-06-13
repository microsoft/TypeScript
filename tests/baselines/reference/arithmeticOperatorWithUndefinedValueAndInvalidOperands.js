//// [tests/cases/conformance/expressions/binaryOperators/arithmeticOperator/arithmeticOperatorWithUndefinedValueAndInvalidOperands.ts] ////

//// [arithmeticOperatorWithUndefinedValueAndInvalidOperands.ts]
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.

var a: boolean;
var b: string;
var c: Object;

// operator *
var r1a1 = undefined * a;
var r1a2 = undefined * b;
var r1a3 = undefined * c;

var r1b1 = a * undefined;
var r1b2 = b * undefined;
var r1b3 = c * undefined;

var r1c1 = undefined * true;
var r1c2 = undefined * '';
var r1c3 = undefined * {};

var r1d1 = true * undefined;
var r1d2 = '' * undefined;
var r1d3 = {} * undefined;

// operator /
var r2a1 = undefined / a;
var r2a2 = undefined / b;
var r2a3 = undefined / c;

var r2b1 = a / undefined;
var r2b2 = b / undefined;
var r2b3 = c / undefined;

var r2c1 = undefined / true;
var r2c2 = undefined / '';
var r2c3 = undefined / {};

var r2d1 = true / undefined;
var r2d2 = '' / undefined;
var r2d3 = {} / undefined;

// operator %
var r3a1 = undefined % a;
var r3a2 = undefined % b;
var r3a3 = undefined % c;

var r3b1 = a % undefined;
var r3b2 = b % undefined;
var r3b3 = c % undefined;

var r3c1 = undefined % true;
var r3c2 = undefined % '';
var r3c3 = undefined % {};

var r3d1 = true % undefined;
var r3d2 = '' % undefined;
var r3d3 = {} % undefined;

// operator -
var r4a1 = undefined - a;
var r4a2 = undefined - b;
var r4a3 = undefined - c;

var r4b1 = a - undefined;
var r4b2 = b - undefined;
var r4b3 = c - undefined;

var r4c1 = undefined - true;
var r4c2 = undefined - '';
var r4c3 = undefined - {};

var r4d1 = true - undefined;
var r4d2 = '' - undefined;
var r4d3 = {} - undefined;

// operator <<
var r5a1 = undefined << a;
var r5a2 = undefined << b;
var r5a3 = undefined << c;

var r5b1 = a << undefined;
var r5b2 = b << undefined;
var r5b3 = c << undefined;

var r5c1 = undefined << true;
var r5c2 = undefined << '';
var r5c3 = undefined << {};

var r5d1 = true << undefined;
var r5d2 = '' << undefined;
var r5d3 = {} << undefined;

// operator >>
var r6a1 = undefined >> a;
var r6a2 = undefined >> b;
var r6a3 = undefined >> c;

var r6b1 = a >> undefined;
var r6b2 = b >> undefined;
var r6b3 = c >> undefined;

var r6c1 = undefined >> true;
var r6c2 = undefined >> '';
var r6c3 = undefined >> {};

var r6d1 = true >> undefined;
var r6d2 = '' >> undefined;
var r6d3 = {} >> undefined;

// operator >>>
var r7a1 = undefined >>> a;
var r7a2 = undefined >>> b;
var r7a3 = undefined >>> c;

var r7b1 = a >>> undefined;
var r7b2 = b >>> undefined;
var r7b3 = c >>> undefined;

var r7c1 = undefined >>> true;
var r7c2 = undefined >>> '';
var r7c3 = undefined >>> {};

var r7d1 = true >>> undefined;
var r7d2 = '' >>> undefined;
var r7d3 = {} >>> undefined;

// operator &
var r8a1 = undefined & a;
var r8a2 = undefined & b;
var r8a3 = undefined & c;

var r8b1 = a & undefined;
var r8b2 = b & undefined;
var r8b3 = c & undefined;

var r8c1 = undefined & true;
var r8c2 = undefined & '';
var r8c3 = undefined & {};

var r8d1 = true & undefined;
var r8d2 = '' & undefined;
var r8d3 = {} & undefined;

// operator ^
var r9a1 = undefined ^ a;
var r9a2 = undefined ^ b;
var r9a3 = undefined ^ c;

var r9b1 = a ^ undefined;
var r9b2 = b ^ undefined;
var r9b3 = c ^ undefined;

var r9c1 = undefined ^ true;
var r9c2 = undefined ^ '';
var r9c3 = undefined ^ {};

var r9d1 = true ^ undefined;
var r9d2 = '' ^ undefined;
var r9d3 = {} ^ undefined;

// operator |
var r10a1 = undefined | a;
var r10a2 = undefined | b;
var r10a3 = undefined | c;

var r10b1 = a | undefined;
var r10b2 = b | undefined;
var r10b3 = c | undefined;

var r10c1 = undefined | true;
var r10c2 = undefined | '';
var r10c3 = undefined | {};

var r10d1 = true | undefined;
var r10d2 = '' | undefined;
var r10d3 = {} | undefined;

//// [arithmeticOperatorWithUndefinedValueAndInvalidOperands.js]
// If one operand is the undefined or undefined value, it is treated as having the type of the
// other operand.
var a;
var b;
var c;
// operator *
var r1a1 = undefined * a;
var r1a2 = undefined * b;
var r1a3 = undefined * c;
var r1b1 = a * undefined;
var r1b2 = b * undefined;
var r1b3 = c * undefined;
var r1c1 = undefined * true;
var r1c2 = undefined * '';
var r1c3 = undefined * {};
var r1d1 = true * undefined;
var r1d2 = '' * undefined;
var r1d3 = {} * undefined;
// operator /
var r2a1 = undefined / a;
var r2a2 = undefined / b;
var r2a3 = undefined / c;
var r2b1 = a / undefined;
var r2b2 = b / undefined;
var r2b3 = c / undefined;
var r2c1 = undefined / true;
var r2c2 = undefined / '';
var r2c3 = undefined / {};
var r2d1 = true / undefined;
var r2d2 = '' / undefined;
var r2d3 = {} / undefined;
// operator %
var r3a1 = undefined % a;
var r3a2 = undefined % b;
var r3a3 = undefined % c;
var r3b1 = a % undefined;
var r3b2 = b % undefined;
var r3b3 = c % undefined;
var r3c1 = undefined % true;
var r3c2 = undefined % '';
var r3c3 = undefined % {};
var r3d1 = true % undefined;
var r3d2 = '' % undefined;
var r3d3 = {} % undefined;
// operator -
var r4a1 = undefined - a;
var r4a2 = undefined - b;
var r4a3 = undefined - c;
var r4b1 = a - undefined;
var r4b2 = b - undefined;
var r4b3 = c - undefined;
var r4c1 = undefined - true;
var r4c2 = undefined - '';
var r4c3 = undefined - {};
var r4d1 = true - undefined;
var r4d2 = '' - undefined;
var r4d3 = {} - undefined;
// operator <<
var r5a1 = undefined << a;
var r5a2 = undefined << b;
var r5a3 = undefined << c;
var r5b1 = a << undefined;
var r5b2 = b << undefined;
var r5b3 = c << undefined;
var r5c1 = undefined << true;
var r5c2 = undefined << '';
var r5c3 = undefined << {};
var r5d1 = true << undefined;
var r5d2 = '' << undefined;
var r5d3 = {} << undefined;
// operator >>
var r6a1 = undefined >> a;
var r6a2 = undefined >> b;
var r6a3 = undefined >> c;
var r6b1 = a >> undefined;
var r6b2 = b >> undefined;
var r6b3 = c >> undefined;
var r6c1 = undefined >> true;
var r6c2 = undefined >> '';
var r6c3 = undefined >> {};
var r6d1 = true >> undefined;
var r6d2 = '' >> undefined;
var r6d3 = {} >> undefined;
// operator >>>
var r7a1 = undefined >>> a;
var r7a2 = undefined >>> b;
var r7a3 = undefined >>> c;
var r7b1 = a >>> undefined;
var r7b2 = b >>> undefined;
var r7b3 = c >>> undefined;
var r7c1 = undefined >>> true;
var r7c2 = undefined >>> '';
var r7c3 = undefined >>> {};
var r7d1 = true >>> undefined;
var r7d2 = '' >>> undefined;
var r7d3 = {} >>> undefined;
// operator &
var r8a1 = undefined & a;
var r8a2 = undefined & b;
var r8a3 = undefined & c;
var r8b1 = a & undefined;
var r8b2 = b & undefined;
var r8b3 = c & undefined;
var r8c1 = undefined & true;
var r8c2 = undefined & '';
var r8c3 = undefined & {};
var r8d1 = true & undefined;
var r8d2 = '' & undefined;
var r8d3 = {} & undefined;
// operator ^
var r9a1 = undefined ^ a;
var r9a2 = undefined ^ b;
var r9a3 = undefined ^ c;
var r9b1 = a ^ undefined;
var r9b2 = b ^ undefined;
var r9b3 = c ^ undefined;
var r9c1 = undefined ^ true;
var r9c2 = undefined ^ '';
var r9c3 = undefined ^ {};
var r9d1 = true ^ undefined;
var r9d2 = '' ^ undefined;
var r9d3 = {} ^ undefined;
// operator |
var r10a1 = undefined | a;
var r10a2 = undefined | b;
var r10a3 = undefined | c;
var r10b1 = a | undefined;
var r10b2 = b | undefined;
var r10b3 = c | undefined;
var r10c1 = undefined | true;
var r10c2 = undefined | '';
var r10c3 = undefined | {};
var r10d1 = true | undefined;
var r10d2 = '' | undefined;
var r10d3 = {} | undefined;

//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithAnyAndNumber.ts] ////

//// [exponentiationOperatorWithAnyAndNumber.ts]
var a: any;
var b: number;

// operator **
var r1 = a ** a;
var r2 = a ** b;
var r3 = a ** 0;
var r4 = 0 ** a;
var r5 = 0 ** 0;
var r6 = b ** 0;
var r7 = 0 ** b;
var r8 = b ** b;

//// [exponentiationOperatorWithAnyAndNumber.js]
var a;
var b;
// operator **
var r1 = a ** a;
var r2 = a ** b;
var r3 = a ** 0;
var r4 = 0 ** a;
var r5 = 0 ** 0;
var r6 = b ** 0;
var r7 = 0 ** b;
var r8 = b ** b;

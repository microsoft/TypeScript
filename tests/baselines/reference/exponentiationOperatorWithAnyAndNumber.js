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
var r1 = Math.pow(a, a);
var r2 = Math.pow(a, b);
var r3 = Math.pow(a, 0);
var r4 = Math.pow(0, a);
var r5 = Math.pow(0, 0);
var r6 = Math.pow(b, 0);
var r7 = Math.pow(0, b);
var r8 = Math.pow(b, b);

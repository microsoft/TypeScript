//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithNew.ts] ////

//// [exponentiationOperatorWithNew.ts]
var a: any;
var b: any;
var c: any;
new a ** b ** c;
new a ** new b ** c;
new (a ** b ** c);

//// [exponentiationOperatorWithNew.js]
var a;
var b;
var c;
Math.pow(new a, Math.pow(b, c));
Math.pow(new a, Math.pow(new b, c));
new (Math.pow(a, Math.pow(b, c)));

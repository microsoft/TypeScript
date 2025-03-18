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
new a ** b ** c;
new a ** new b ** c;
new (a ** b ** c);

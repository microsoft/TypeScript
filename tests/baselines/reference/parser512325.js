//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser512325.ts] ////

//// [parser512325.ts]
var tt = (a, (b, c)) => a+b+c;

//// [parser512325.js]
var tt = (a, (b, c));
a + b + c;

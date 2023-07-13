//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithTwoOperandsAreAny.ts] ////

//// [comparisonOperatorWithTwoOperandsAreAny.ts]
var a: any;

var r1 = a < a;
var r2 = a > a;
var r3 = a <= a;
var r4 = a >= a;
var r5 = a == a;
var r6 = a != a;
var r7 = a === a;
var r8 = a !== a;

//// [comparisonOperatorWithTwoOperandsAreAny.js]
var a;
var r1 = a < a;
var r2 = a > a;
var r3 = a <= a;
var r4 = a >= a;
var r5 = a == a;
var r6 = a != a;
var r7 = a === a;
var r8 = a !== a;

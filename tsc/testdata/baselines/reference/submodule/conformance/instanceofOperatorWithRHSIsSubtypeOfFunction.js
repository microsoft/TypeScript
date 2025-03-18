//// [tests/cases/conformance/expressions/binaryOperators/instanceofOperator/instanceofOperatorWithRHSIsSubtypeOfFunction.ts] ////

//// [instanceofOperatorWithRHSIsSubtypeOfFunction.ts]
interface I extends Function { }

var x: any;
var f1: Function;
var f2: I;
var f3: { (): void };
var f4: { new (): number };

var r1 = x instanceof f1;
var r2 = x instanceof f2;
var r3 = x instanceof f3;
var r4 = x instanceof f4;
var r5 = x instanceof null;
var r6 = x instanceof undefined;

//// [instanceofOperatorWithRHSIsSubtypeOfFunction.js]
var x;
var f1;
var f2;
var f3;
var f4;
var r1 = x instanceof f1;
var r2 = x instanceof f2;
var r3 = x instanceof f3;
var r4 = x instanceof f4;
var r5 = x instanceof null;
var r6 = x instanceof undefined;

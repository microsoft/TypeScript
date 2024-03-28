//// [tests/cases/conformance/es7/exponentiationOperator/compoundExponentiationAssignmentLHSCanBeAssigned1.ts] ////

//// [compoundExponentiationAssignmentLHSCanBeAssigned1.ts]
enum E { a, b, c }

var a: any;
var b: number;
var c: E;

var x1: any;
x1 **= a;
x1 **= b;
x1 **= c;
x1 **= null;
x1 **= undefined;

var x2: number;
x2 **= a;
x2 **= b;
x2 **= c;
x2 **= null;
x2 **= undefined;

var x3: E;
x3 **= a;
x3 **= b;
x3 **= c;
x3 **= null;
x3 **= undefined;

//// [compoundExponentiationAssignmentLHSCanBeAssigned1.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
var a;
var b;
var c;
var x1;
x1 = Math.pow(x1, a);
x1 = Math.pow(x1, b);
x1 = Math.pow(x1, c);
x1 = Math.pow(x1, null);
x1 = Math.pow(x1, undefined);
var x2;
x2 = Math.pow(x2, a);
x2 = Math.pow(x2, b);
x2 = Math.pow(x2, c);
x2 = Math.pow(x2, null);
x2 = Math.pow(x2, undefined);
var x3;
x3 = Math.pow(x3, a);
x3 = Math.pow(x3, b);
x3 = Math.pow(x3, c);
x3 = Math.pow(x3, null);
x3 = Math.pow(x3, undefined);

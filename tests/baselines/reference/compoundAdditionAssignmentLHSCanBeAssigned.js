//// [tests/cases/conformance/expressions/assignmentOperator/compoundAdditionAssignmentLHSCanBeAssigned.ts] ////

//// [compoundAdditionAssignmentLHSCanBeAssigned.ts]
enum E { a, b }

var a: any;
var b: void;

var x1: any;
x1 += a;
x1 += b;
x1 += true;
x1 += 0;
x1 += '';
x1 += E.a;
x1 += {};
x1 += null;
x1 += undefined;

var x2: string;
x2 += a;
x2 += b;
x2 += true;
x2 += 0;
x2 += '';
x2 += E.a;
x2 += {};
x2 += null;
x2 += undefined;

var x3: number;
x3 += a;
x3 += 0;
x3 += E.a;
x3 += null;
x3 += undefined;

var x4: E;
x4 += a;
x4 += 0;
x4 += E.a;
x4 += null;
x4 += undefined;

var x5: boolean;
x5 += a;

var x6: {};
x6 += a;
x6 += '';

var x7: void;
x7 += a;

//// [compoundAdditionAssignmentLHSCanBeAssigned.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
var a;
var b;
var x1;
x1 += a;
x1 += b;
x1 += true;
x1 += 0;
x1 += '';
x1 += E.a;
x1 += {};
x1 += null;
x1 += undefined;
var x2;
x2 += a;
x2 += b;
x2 += true;
x2 += 0;
x2 += '';
x2 += E.a;
x2 += {};
x2 += null;
x2 += undefined;
var x3;
x3 += a;
x3 += 0;
x3 += E.a;
x3 += null;
x3 += undefined;
var x4;
x4 += a;
x4 += 0;
x4 += E.a;
x4 += null;
x4 += undefined;
var x5;
x5 += a;
var x6;
x6 += a;
x6 += '';
var x7;
x7 += a;

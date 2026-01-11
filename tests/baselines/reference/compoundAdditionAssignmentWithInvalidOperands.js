//// [tests/cases/conformance/expressions/assignmentOperator/compoundAdditionAssignmentWithInvalidOperands.ts] ////

//// [compoundAdditionAssignmentWithInvalidOperands.ts]
enum E { a, b }

declare var a: void;

declare var x1: boolean;
x1 += a;
x1 += true;
x1 += 0;
x1 += E.a;
x1 += {};
x1 += null;
x1 += undefined;

declare var x2: {};
x2 += a;
x2 += true;
x2 += 0;
x2 += E.a;
x2 += {};
x2 += null;
x2 += undefined;

declare var x3: void;
x3 += a;
x3 += true;
x3 += 0;
x3 += E.a;
x3 += {};
x3 += null;
x3 += undefined;

declare var x4: number;
x4 += a;
x4 += true;
x4 += {};

declare var x5: E;
x5 += a;
x5 += true;
x5 += {};

//// [compoundAdditionAssignmentWithInvalidOperands.js]
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
x1 += a;
x1 += true;
x1 += 0;
x1 += E.a;
x1 += {};
x1 += null;
x1 += undefined;
x2 += a;
x2 += true;
x2 += 0;
x2 += E.a;
x2 += {};
x2 += null;
x2 += undefined;
x3 += a;
x3 += true;
x3 += 0;
x3 += E.a;
x3 += {};
x3 += null;
x3 += undefined;
x4 += a;
x4 += true;
x4 += {};
x5 += a;
x5 += true;
x5 += {};

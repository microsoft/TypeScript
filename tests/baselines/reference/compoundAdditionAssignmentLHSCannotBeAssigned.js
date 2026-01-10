//// [tests/cases/conformance/expressions/assignmentOperator/compoundAdditionAssignmentLHSCannotBeAssigned.ts] ////

//// [compoundAdditionAssignmentLHSCannotBeAssigned.ts]
// string can add every type, and result string cannot be assigned to below types
enum E { a, b, c }

declare var x1: boolean;
x1 += '';

declare var x2: number;
x2 += '';

declare var x3: E;
x3 += '';

declare var x4: {a: string};
x4 += '';

declare var x5: void;
x5 += '';

//// [compoundAdditionAssignmentLHSCannotBeAssigned.js]
// string can add every type, and result string cannot be assigned to below types
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
    E[E["c"] = 2] = "c";
})(E || (E = {}));
x1 += '';
x2 += '';
x3 += '';
x4 += '';
x5 += '';

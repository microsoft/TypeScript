//// [tests/cases/conformance/expressions/binaryOperators/logicalAndOperator/logicalAndOperatorWithTypeParameters.ts] ////

//// [logicalAndOperatorWithTypeParameters.ts]
// The && operator permits the operands to be of any type and produces a result of the same
// type as the second operand.

function foo<T, U, V/* extends T*/>(t: T, u: U, v: V) {
    var r1 = t && t;
    var r2 = u && t;
    var r3 = v && t;

    var r4 = t && u;
    var r5 = u && u;
    var r6 = v && u;

    var r7 = t && v;
    var r8 = u && v;
    var r9 = v && v;

    var a: number;
    var r10 = t && a;
}

//// [logicalAndOperatorWithTypeParameters.js]
// The && operator permits the operands to be of any type and produces a result of the same
// type as the second operand.
function foo(t, u, v) {
    var r1 = t && t;
    var r2 = u && t;
    var r3 = v && t;
    var r4 = t && u;
    var r5 = u && u;
    var r6 = v && u;
    var r7 = t && v;
    var r8 = u && v;
    var r9 = v && v;
    var a;
    var r10 = t && a;
}

//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithIdenticalTypeParameter.ts] ////

//// [comparisonOperatorWithIdenticalTypeParameter.ts]
function foo<T>(t: T) {
    var r1 = t < t;
    var r2 = t > t;
    var r3 = t <= t;
    var r4 = t >= t;
    var r5 = t == t;
    var r6 = t != t;
    var r7 = t === t;
    var r8 = t !== t;
}

//// [comparisonOperatorWithIdenticalTypeParameter.js]
function foo(t) {
    var r1 = t < t;
    var r2 = t > t;
    var r3 = t <= t;
    var r4 = t >= t;
    var r5 = t == t;
    var r6 = t != t;
    var r7 = t === t;
    var r8 = t !== t;
}

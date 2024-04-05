//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName30.ts] ////

//// [parserComputedPropertyName30.ts]
enum E {
    // no ASI, comma expected
    [e] = id++
    [e2] = 1
}

//// [parserComputedPropertyName30.js]
var E;
(function (E) {
    // no ASI, comma expected
    E[E[e] = id++] = e;
    E[E[e2] = 1] = e2;
})(E || (E = {}));

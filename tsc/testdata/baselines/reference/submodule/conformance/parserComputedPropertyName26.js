//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName26.ts] ////

//// [parserComputedPropertyName26.ts]
enum E {
    // No ASI
    [e] = 0
    [e2] = 1
}

//// [parserComputedPropertyName26.js]
var E;
(function (E) {
    E[e] = 0[e2] = 1;
    if (typeof E[e] !== "string") E[E[e]] = e;
})(E || (E = {}));

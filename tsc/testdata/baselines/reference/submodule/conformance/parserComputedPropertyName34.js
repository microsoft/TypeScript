//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName34.ts] ////

//// [parserComputedPropertyName34.ts]
enum E {
    // no ASI, comma expected
    [e] = id++,
    [e2] = 1
}

//// [parserComputedPropertyName34.js]
var E;
(function (E) {
    // no ASI, comma expected
    E[e] = id++;
    if (typeof E[e] !== "string") E[E[e]] = e;
    E[E[e2] = 1] = e2;
})(E || (E = {}));

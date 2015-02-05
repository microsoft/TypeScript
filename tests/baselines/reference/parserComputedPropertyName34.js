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
    E[E[e] = id++] = e;
    E[E[e2] = 1] = e2;
})(E || (E = {}));

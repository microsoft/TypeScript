//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName16.ts] ////

//// [parserComputedPropertyName16.ts]
enum E {
  [e] = 1
}

//// [parserComputedPropertyName16.js]
var E;
(function (E) {
    E[E[e] = 1] = e;
})(E || (E = {}));

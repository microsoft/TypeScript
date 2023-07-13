//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName6.ts] ////

//// [parserES5ComputedPropertyName6.ts]
enum E {
  [e] = 1
}

//// [parserES5ComputedPropertyName6.js]
var E;
(function (E) {
    E[E[e] = 1] = e;
})(E || (E = {}));

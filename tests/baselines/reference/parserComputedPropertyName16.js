//// [parserComputedPropertyName16.ts]
enum E {
  [e] = 1
}

//// [parserComputedPropertyName16.js]
var E;
(function (E) {
    E[E[e] = 1] = e;
})(E || (E = {}));

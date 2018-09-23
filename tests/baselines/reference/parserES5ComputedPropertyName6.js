//// [parserES5ComputedPropertyName6.ts]
enum E {
  [e] = 1
}

//// [parserES5ComputedPropertyName6.js]
var E = E || (E = {});
(function (E) {
    E[E[e] = 1] = e;
})(E);

//// [es3-oldStyleOctalLiteralInEnums.ts]
enum E {
  x = -01,
  y = 02,
}

//// [es3-oldStyleOctalLiteralInEnums.js]
var E;
(function (E) {
    E[E["x"] = -1] = "x";
    E[E["y"] = 2] = "y";
})(E || (E = {}));

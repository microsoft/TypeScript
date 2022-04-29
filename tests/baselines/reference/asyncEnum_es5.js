//// [asyncEnum_es5.ts]
async enum E {
  Value
}

//// [asyncEnum_es5.js]
var E;
(function (E) {
    E[E["Value"] = 0] = "Value";
})(E || (E = {}));

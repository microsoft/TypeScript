//// [asyncEnum_es6.ts]
async enum E {  
  Value
}

//// [asyncEnum_es6.js]
var E;
(function (E) {
    E[E["Value"] = 0] = "Value";
})(E || (E = {}));

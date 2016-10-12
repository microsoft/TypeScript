//// [asyncEnum_es2017.ts]
async enum E {  
  Value
}

//// [asyncEnum_es2017.js]
var E;
(function (E) {
    E[E["Value"] = 0] = "Value";
})(E || (E = {}));

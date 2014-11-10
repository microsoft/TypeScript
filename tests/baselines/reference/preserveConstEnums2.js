//// [preserveConstEnums2.ts]
module M {
  const enum E {
    Value = 1, Value2 = Value
  }
}

// Module M should be considered instantiated if we have preserveConstEnum set.
var v = M;

//// [preserveConstEnums2.js]
var M;
(function (M) {
    var E;
    (function (E) {
        E[E["Value"] = 1] = "Value";
        E[E["Value2"] = 1] = "Value2";
    })(E || (E = {}));
})(M || (M = {}));
// Module M should be considered instantiated if we have preserveConstEnum set.
var v = M;

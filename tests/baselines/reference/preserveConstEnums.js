//// [preserveConstEnums.ts]
const enum E {
    Value = 1, Value2 = Value
}

//// [preserveConstEnums.js]
var E;
(function (E) {
    E[E["Value"] = 1] = "Value";
    E[E["Value2"] = 1] = "Value2";
})(E || (E = {}));

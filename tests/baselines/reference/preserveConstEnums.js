//// [preserveConstEnums.ts]
const enum E {
    Value = 1, Value2 = Value
}

//// [preserveConstEnums.js]
var E;
(function (E) {
    E["Value"] = 1;
    E["Value2"] = 1;
})(E || (E = {}));

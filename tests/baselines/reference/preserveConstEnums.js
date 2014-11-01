//// [preserveConstEnums.ts]
const enum E {
    Value = 1
}

//// [preserveConstEnums.js]
var E;
(function (E) {
    E[E["Value"] = 1] = "Value";
})(E || (E = {}));

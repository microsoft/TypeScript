//// [preserveConstEnums1.ts]
const enum E {
    Value = 1, Value2 = Value
}

// Referencing E as a value is allowed if preserveConstEnums is true.
var s: string;
var n: number;

var x = E;
var y = E[s];
var z = E[n];

//// [preserveConstEnums1.js]
var E;
(function (E) {
    E[E["Value"] = 1] = "Value";
    E[E["Value2"] = 1] = "Value2";
})(E || (E = {}));
// Referencing E as a value is allowed if preserveConstEnums is true.
var s;
var n;
var x = E;
var y = E[s];
var z = E[n];

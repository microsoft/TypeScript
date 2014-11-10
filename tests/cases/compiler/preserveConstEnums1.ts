// @preserveConstEnums: true
const enum E {
    Value = 1, Value2 = Value
}

// Referencing E as a value is allowed if preserveConstEnums is true.
var s: string;
var n: number;

var x = E;
var y = E[s];
var z = E[n];
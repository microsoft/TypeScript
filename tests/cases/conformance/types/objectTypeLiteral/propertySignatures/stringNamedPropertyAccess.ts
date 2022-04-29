class C {
    "a b": number;
    static "c d": number;
}
var c: C;
var r1 = c["a b"];
var r1b = C['c d'];

interface I {
    "a b": number;
}
var i: I;
var r2 = i["a b"];

var a: {
    "a b": number;
}
var r3 = a["a b"];

var b = {
    "a b": 1
}
var r4 = b["a b"];
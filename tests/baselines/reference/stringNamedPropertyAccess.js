//// [stringNamedPropertyAccess.ts]
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

//// [stringNamedPropertyAccess.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var r1 = c["a b"];
var r1b = C['c d'];
var i;
var r2 = i["a b"];
var a;
var r3 = a["a b"];
var b = {
    "a b": 1
};
var r4 = b["a b"];

//// [stringNamedPropertyDuplicates.ts]
class C {
    "a b": number;
    "a b": number;
    static "c d": number;
    static "c d": number;
}

interface I {
    "a b": number;
    "a b": number;
}

var a: {
    "a b": number;
    "a b": number;
}

var b = {
    "a b": 1
    "a b": 1
}

//// [stringNamedPropertyDuplicates.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var b = {
    "a b": 1,
    "a b": 1
};

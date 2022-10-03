//// [numericNamedPropertyDuplicates.ts]
class C {
    1: number;
    1.0: number;
    static 2: number;
    static 2: number;
}

interface I {
    2: number;
    2.: number;
}

var a: {
    1: number;
    1: number;
}

var b = {
    2: 1
    2: 1
}

//// [numericNamedPropertyDuplicates.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var b = {
    2: 1,
    2: 1
};

//// [objectTypesWithOptionalProperties2.ts]
// Illegal attempts to define optional methods

var a: {
    x()?: number; // error
}

interface I {
    x()?: number; // error
}

class C {
    x()?: number; // error
}

interface I2<T> {
    x()?: T; // error
}

class C2<T> {
    x()?: T; // error
}


var b = {
    x()?: 1 // error
}

//// [objectTypesWithOptionalProperties2.js]
// Illegal attempts to define optional methods
var a;
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.x = function () { };
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    C2.prototype.x = function () { };
    return C2;
}());
var b = {
    x: function () { },
    1:  // error
};

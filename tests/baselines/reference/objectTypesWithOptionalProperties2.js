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
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.x = function () { };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.x = function () { };
    return C2;
}());
var b = {
    x: function () { }, 1:  // error
};

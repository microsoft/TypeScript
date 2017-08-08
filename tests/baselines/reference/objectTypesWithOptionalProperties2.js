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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var a;
var C = (function () {
    function C() {
    }
    C.prototype.x = function () { };
    __names(C.prototype, ["x"]);
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.x = function () { };
    __names(C2.prototype, ["x"]);
    return C2;
}());
var b = {
    x: function () { }, 1:  // error
};

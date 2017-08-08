//// [classWithDuplicateIdentifier.ts]
class C {
    a(): number { return 0; } // error: duplicate identifier
    a: number;
}
class K {
    b: number; // error: duplicate identifier
    b(): number { return 0; }
}
class D {
    c: number;
    c: string;
}


//// [classWithDuplicateIdentifier.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.a = function () { return 0; }; // error: duplicate identifier
    __names(C.prototype, ["a"]);
    return C;
}());
var K = (function () {
    function K() {
    }
    K.prototype.b = function () { return 0; };
    __names(K.prototype, ["b"]);
    return K;
}());
var D = (function () {
    function D() {
    }
    return D;
}());

//// [emitDefaultParametersMethod.ts]
class C {
    constructor(t: boolean, z: string, x: number, y = "hello") { }

    public foo(x: string, t = false) { }
    public foo1(x: string, t = false, ...rest) { }
    public bar(t = false) { }
    public boo(t = false, ...rest) { }
}

class D {
    constructor(y = "hello") { }
}

class E {
    constructor(y = "hello", ...rest) { }
}


//// [emitDefaultParametersMethod.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
    function C(t, z, x, y) {
        if (y === void 0) { y = "hello"; }
    }
    C.prototype.foo = function (x, t) {
        if (t === void 0) { t = false; }
    };
    C.prototype.foo1 = function (x, t) {
        if (t === void 0) { t = false; }
        var rest = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            rest[_i - 2] = arguments[_i];
        }
    };
    C.prototype.bar = function (t) {
        if (t === void 0) { t = false; }
    };
    C.prototype.boo = function (t) {
        if (t === void 0) { t = false; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    };
    __names(C.prototype, ["foo", "foo1", "bar", "boo"]);
    return C;
}());
var D = (function () {
    function D(y) {
        if (y === void 0) { y = "hello"; }
    }
    return D;
}());
var E = (function () {
    function E(y) {
        if (y === void 0) { y = "hello"; }
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
    }
    return E;
}());

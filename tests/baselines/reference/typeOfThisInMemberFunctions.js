//// [typeOfThisInMemberFunctions.ts]
class C {
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

class D<T> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

class E<T extends Date> {
    x: T;
    foo() {
        var r = this;
    }

    static bar() {
        var r2 = this;
    }
}

//// [typeOfThisInMemberFunctions.js]
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
    function C() {
    }
    C.prototype.foo = function () {
        var r = this;
    };
    C.bar = function () {
        var r2 = this;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.foo = function () {
        var r = this;
    };
    D.bar = function () {
        var r2 = this;
    };
    __names(D.prototype, ["foo"]);
    return D;
}());
var E = (function () {
    function E() {
    }
    E.prototype.foo = function () {
        var r = this;
    };
    E.bar = function () {
        var r2 = this;
    };
    __names(E.prototype, ["foo"]);
    return E;
}());

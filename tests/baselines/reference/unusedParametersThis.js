//// [unusedParametersThis.ts]
class A {
    public a: number;

    public method(this: this): number {
        return this.a;
    }

    public method2(this: A): number {
        return this.a;
    }

    public method3(this: this): number {
        var fn = () => this.a;
        return fn();
    }

    public method4(this: A): number {
        var fn = () => this.a;
        return fn();
    }

    static staticMethod(this: A): number {
        return this.a;
    }
}

function f(this: A): number {
    return this.a
}

var f2 = function f2(this: A): number {
    return this.a;
};

//// [unusedParametersThis.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.method = function () {
        return this.a;
    };
    A.prototype.method2 = function () {
        return this.a;
    };
    A.prototype.method3 = function () {
        var _this = this;
        var fn = function () { return _this.a; };
        return fn();
    };
    A.prototype.method4 = function () {
        var _this = this;
        var fn = function () { return _this.a; };
        return fn();
    };
    A.staticMethod = function () {
        return this.a;
    };
    __names(A.prototype, ["method", "method2", "method3", "method4"]);
    return A;
}());
function f() {
    return this.a;
}
var f2 = function f2() {
    return this.a;
};

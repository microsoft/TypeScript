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
var A = /** @class */ (function () {
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
    return A;
}());
function f() {
    return this.a;
}
var f2 = function f2() {
    return this.a;
};

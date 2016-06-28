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
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var r = this;
    };
    C.bar = function () {
        var r2 = this;
    };
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
    return E;
}());

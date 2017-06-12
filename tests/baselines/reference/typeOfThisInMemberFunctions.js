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
    var proto_1 = C.prototype;
    proto_1.foo = function () {
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
    var proto_2 = D.prototype;
    proto_2.foo = function () {
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
    var proto_3 = E.prototype;
    proto_3.foo = function () {
        var r = this;
    };
    E.bar = function () {
        var r2 = this;
    };
    return E;
}());

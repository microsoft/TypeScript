//// [tests/cases/conformance/classes/propertyMemberDeclarations/memberFunctionDeclarations/typeOfThisInMemberFunctions.ts] ////

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
var C = /** @class */ (function () {
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
var D = /** @class */ (function () {
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
var E = /** @class */ (function () {
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

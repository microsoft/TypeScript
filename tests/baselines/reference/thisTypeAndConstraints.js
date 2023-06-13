//// [tests/cases/conformance/types/thisType/thisTypeAndConstraints.ts] ////

//// [thisTypeAndConstraints.ts]
class A {
    self() {
        return this;
    }
}

function f<T extends A>(x: T) {
    function g<U extends T>(x: U) {
        x = x.self();
    }
    x = x.self();
}

class B<T extends A> {
    foo(x: T) {
        x = x.self();
    }
    bar<U extends T>(x: U) {
        x = x.self();
    }
}


//// [thisTypeAndConstraints.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.self = function () {
        return this;
    };
    return A;
}());
function f(x) {
    function g(x) {
        x = x.self();
    }
    x = x.self();
}
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function (x) {
        x = x.self();
    };
    B.prototype.bar = function (x) {
        x = x.self();
    };
    return B;
}());

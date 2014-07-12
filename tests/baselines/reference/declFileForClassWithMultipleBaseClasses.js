//// [declFileForClassWithMultipleBaseClasses.ts]

class A {
    foo() { }
}

class B {
    bar() { }
}

interface I {
    baz();
}

interface J {
    bat();
}


class D implements I, J {
    baz() { }
    bat() { }
    foo() { }
    bar() { }
}

interface I extends A, B {
}

//// [declFileForClassWithMultipleBaseClasses.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () {
    };
    return B;
})();
var D = (function () {
    function D() {
    }
    D.prototype.baz = function () {
    };
    D.prototype.bat = function () {
    };
    D.prototype.foo = function () {
    };
    D.prototype.bar = function () {
    };
    return D;
})();


//// [declFileForClassWithMultipleBaseClasses.d.ts]

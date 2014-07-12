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


////[declFileForClassWithMultipleBaseClasses.d.ts]
declare class A {
    public foo(): void;
}
declare class B {
    public bar(): void;
}
interface I {
    baz(): any;
}
interface J {
    bat(): any;
}
declare class D implements I, J {
    public baz(): void;
    public bat(): void;
    public foo(): void;
    public bar(): void;
}
interface I extends A, B {
}

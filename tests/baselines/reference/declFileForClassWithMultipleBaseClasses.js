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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    return B;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.baz = function () { };
    D.prototype.bat = function () { };
    D.prototype.foo = function () { };
    D.prototype.bar = function () { };
    return D;
}());


//// [declFileForClassWithMultipleBaseClasses.d.ts]
declare class A {
    foo(): void;
}
declare class B {
    bar(): void;
}
interface I {
    baz(): any;
}
interface J {
    bat(): any;
}
declare class D implements I, J {
    baz(): void;
    bat(): void;
    foo(): void;
    bar(): void;
}
interface I extends A, B {
}

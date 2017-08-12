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
    var proto_1 = A.prototype;
    proto_1.foo = function () { };
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    proto_2.bar = function () { };
    return B;
}());
var D = (function () {
    function D() {
    }
    var proto_3 = D.prototype;
    proto_3.baz = function () { };
    proto_3.bat = function () { };
    proto_3.foo = function () { };
    proto_3.bar = function () { };
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

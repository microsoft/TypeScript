//// [noImplicitAnyForMethodParameters.ts]
declare class A {
    private foo(a); // OK - ambient class and private method - no error
}

declare class B {
    public foo(a); // OK - ambient class and public method - error
}

class C {
    private foo(a) { } // OK - non-ambient class and private method - error
}
class D {
    public foo(a) { } // OK - non-ambient class and public method - error
}

//// [noImplicitAnyForMethodParameters.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (a) { }; // OK - non-ambient class and private method - error
    return C;
}());
var D = (function () {
    function D() {
    }
    var proto_2 = D.prototype;
    proto_2.foo = function (a) { }; // OK - non-ambient class and public method - error
    return D;
}());

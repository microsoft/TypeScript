//// [staticInstanceResolution4.ts]
class A {
   public foo() {}
}

A.foo();

//// [staticInstanceResolution4.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () { };
    return A;
}());
A.foo();

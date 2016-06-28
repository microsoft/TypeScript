//// [staticInstanceResolution4.ts]
class A {
   public foo() {}
}

A.foo();

//// [staticInstanceResolution4.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
A.foo();

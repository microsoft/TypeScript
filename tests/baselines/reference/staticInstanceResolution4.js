//// [staticInstanceResolution4.ts]
class A {
   public foo() {}
}

A.foo();

//// [staticInstanceResolution4.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
A.foo();

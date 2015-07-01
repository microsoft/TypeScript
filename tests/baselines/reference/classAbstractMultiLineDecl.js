//// [classAbstractMultiLineDecl.ts]
abstract class A {}

abstract
class B {}

abstract

class C {}

new A;
new B;
new C;

//// [classAbstractMultiLineDecl.js]
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function () {
    function B() {
    }
    return B;
})();
var C = (function () {
    function C() {
    }
    return C;
})();
new A;
new B;
new C;

//// [MemberFunctionDeclaration7_es6.ts]
class C {
   *foo<T>() { }
}

//// [MemberFunctionDeclaration7_es6.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());

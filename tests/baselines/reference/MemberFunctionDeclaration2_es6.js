//// [MemberFunctionDeclaration2_es6.ts]
class C {
   public * foo() { }
}

//// [MemberFunctionDeclaration2_es6.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());

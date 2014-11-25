//// [MemberFunctionDeclaration2.ts]
class C {
   public * foo() { }
}

//// [MemberFunctionDeclaration2.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
    };
    return C;
})();

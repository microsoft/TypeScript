//// [MemberFunctionDeclaration1.ts]
class C {
   *foo() { }
}

//// [MemberFunctionDeclaration1.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
    };
    return C;
})();

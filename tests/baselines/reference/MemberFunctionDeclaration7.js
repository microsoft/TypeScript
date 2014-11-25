//// [MemberFunctionDeclaration7.ts]
class C {
   *foo<T>() { }
}

//// [MemberFunctionDeclaration7.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
    };
    return C;
})();

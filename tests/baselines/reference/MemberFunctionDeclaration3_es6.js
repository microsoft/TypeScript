//// [MemberFunctionDeclaration3_es6.ts]
class C {
   *[foo]() { }
}

//// [MemberFunctionDeclaration3_es6.js]
var C = (function () {
    function C() {
    }
    C.prototype[foo] = function () { };
    return C;
}());

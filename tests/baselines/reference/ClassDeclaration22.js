//// [ClassDeclaration22.ts]
class C {
    "foo"();
    "bar"() { }
}

//// [ClassDeclaration22.js]
var C = (function () {
    function C() {
    }
    C.prototype["bar"] = function () { };
    return C;
}());

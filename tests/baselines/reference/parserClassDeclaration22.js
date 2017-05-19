//// [parserClassDeclaration22.ts]
class C {
    "foo"();
    "bar"() { }
}

//// [parserClassDeclaration22.js]
var C = (function () {
    function C() {
    }
    C.prototype["bar"] = function () { };
    return C;
}());

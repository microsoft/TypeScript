//// [parserClassDeclaration19.ts]
class C {
    foo();
    "foo"() { }
}

//// [parserClassDeclaration19.js]
var C = (function () {
    function C() {
    }
    C.prototype["foo"] = function () { };
    return C;
}());

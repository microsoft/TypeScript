//// [parserClassDeclaration19.ts]
class C {
    foo();
    "foo"() { }
}

//// [parserClassDeclaration19.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["foo"] = function () { };
    return C;
}());

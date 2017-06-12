//// [parserClassDeclaration19.ts]
class C {
    foo();
    "foo"() { }
}

//// [parserClassDeclaration19.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1["foo"] = function () { };
    return C;
}());

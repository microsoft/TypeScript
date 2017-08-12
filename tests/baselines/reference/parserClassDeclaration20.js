//// [parserClassDeclaration20.ts]
class C {
    0();
    "0"() { }
}

//// [parserClassDeclaration20.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1["0"] = function () { };
    return C;
}());

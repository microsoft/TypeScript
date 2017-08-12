//// [parserClassDeclaration21.ts]
class C {
    0();
    1() { }
}

//// [parserClassDeclaration21.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1[1] = function () { };
    return C;
}());

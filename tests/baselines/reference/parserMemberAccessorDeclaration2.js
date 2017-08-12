//// [parserMemberAccessorDeclaration2.ts]
class C {
  get "b"() { }
}

//// [parserMemberAccessorDeclaration2.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "b", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

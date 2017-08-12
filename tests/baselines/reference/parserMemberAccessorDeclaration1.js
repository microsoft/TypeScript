//// [parserMemberAccessorDeclaration1.ts]
class C {
  get a() { }
}

//// [parserMemberAccessorDeclaration1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "a", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

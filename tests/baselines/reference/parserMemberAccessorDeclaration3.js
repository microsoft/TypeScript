//// [parserMemberAccessorDeclaration3.ts]
class C {
  get 0() { }
}

//// [parserMemberAccessorDeclaration3.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, 0, {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

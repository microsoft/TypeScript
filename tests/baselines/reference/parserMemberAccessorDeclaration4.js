//// [parserMemberAccessorDeclaration4.ts]
class C {
  set a(i) { }
}

//// [parserMemberAccessorDeclaration4.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "a", {
        set: function (i) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

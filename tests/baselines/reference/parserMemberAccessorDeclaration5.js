//// [parserMemberAccessorDeclaration5.ts]
class C {
  set "a"(i) { }
}

//// [parserMemberAccessorDeclaration5.js]
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

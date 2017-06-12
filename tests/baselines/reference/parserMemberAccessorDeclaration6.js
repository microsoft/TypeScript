//// [parserMemberAccessorDeclaration6.ts]
class C {
  set 0(i) { }
}

//// [parserMemberAccessorDeclaration6.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, 0, {
        set: function (i) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

//// [parserMemberAccessorDeclaration6.ts]
class C {
  set 0(i) { }
}

//// [parserMemberAccessorDeclaration6.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, 0, {
        set: function (i) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());

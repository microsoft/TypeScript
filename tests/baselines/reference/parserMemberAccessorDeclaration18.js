//// [parserMemberAccessorDeclaration18.ts]
class C {
   set Foo(...a) { }
}

//// [parserMemberAccessorDeclaration18.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function () { },
        enumerable: false,
        configurable: true
    });
    return C;
}());

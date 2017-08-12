//// [parserMemberAccessorDeclaration13.ts]
class C {
   set Foo() { }
}

//// [parserMemberAccessorDeclaration13.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "Foo", {
        set: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

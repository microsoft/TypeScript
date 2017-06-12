//// [parserMemberAccessorDeclaration17.ts]
class C {
   set Foo(a?: number) { }
}

//// [parserMemberAccessorDeclaration17.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "Foo", {
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

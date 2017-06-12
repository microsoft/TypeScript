//// [parserMemberAccessorDeclaration12.ts]
class C {
   get Foo(a: number) { }
}

//// [parserMemberAccessorDeclaration12.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "Foo", {
        get: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

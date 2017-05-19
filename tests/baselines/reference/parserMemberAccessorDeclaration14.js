//// [parserMemberAccessorDeclaration14.ts]
class C {
   set Foo(a: number, b: number) { }
}

//// [parserMemberAccessorDeclaration14.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a, b) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

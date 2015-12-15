//// [MemberAccessorDeclaration15.ts]
class C {
   set Foo(public a: number) { }
}

//// [MemberAccessorDeclaration15.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

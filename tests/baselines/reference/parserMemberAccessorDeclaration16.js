//// [parserMemberAccessorDeclaration16.ts]
class C {
   set Foo(a = 1) { }
}

//// [parserMemberAccessorDeclaration16.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "Foo", {
        set: function (a) {
            if (a === void 0) { a = 1; }
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());

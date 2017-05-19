//// [parserSetAccessorWithTypeParameters1.ts]
class C {
   set foo<T>(v) { }
}

//// [parserSetAccessorWithTypeParameters1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

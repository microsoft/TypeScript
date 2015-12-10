//// [parserSetAccessorWithTypeAnnotation1.ts]
class C {
   set foo(v): number {
   }
}

//// [parserSetAccessorWithTypeAnnotation1.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());

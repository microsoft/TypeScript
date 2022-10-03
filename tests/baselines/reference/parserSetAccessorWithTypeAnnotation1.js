//// [parserSetAccessorWithTypeAnnotation1.ts]
class C {
   set foo(v): number {
   }
}

//// [parserSetAccessorWithTypeAnnotation1.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "foo", {
        set: function (v) {
        },
        enumerable: false,
        configurable: true
    });
    return C;
}());

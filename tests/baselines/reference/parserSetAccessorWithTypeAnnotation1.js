//// [parserSetAccessorWithTypeAnnotation1.ts]
class C {
   set foo(v): number {
   }
}

//// [parserSetAccessorWithTypeAnnotation1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "foo", {
        set: function (v) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
}());

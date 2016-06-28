//// [indexSignatureWithoutTypeAnnotation1.ts]
class C {
  [a: number];
}

//// [indexSignatureWithoutTypeAnnotation1.js]
var C = (function () {
    function C() {
    }
    return C;
}());

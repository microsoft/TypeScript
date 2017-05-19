//// [indexSignatureWithInitializer1.ts]
class C {
  [a: number = 1]: number;
}

//// [indexSignatureWithInitializer1.js]
var C = (function () {
    function C() {
    }
    return C;
}());

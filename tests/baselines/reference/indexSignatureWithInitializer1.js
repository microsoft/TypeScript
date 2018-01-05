//// [indexSignatureWithInitializer1.ts]
class C {
  [a: number = 1]: number;
}

//// [indexSignatureWithInitializer1.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());

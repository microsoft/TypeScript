//// [indexSignatureWithInitializer.ts]
// These used to be indexers, now they are computed properties
interface I {
    [x = '']: string;
}

class C {
    [x = 0]: string
}

//// [indexSignatureWithInitializer.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
x = 0;

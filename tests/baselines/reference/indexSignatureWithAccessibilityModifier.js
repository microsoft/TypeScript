//// [indexSignatureWithAccessibilityModifier.ts]
interface I {
    [public x: string]: string;
}

class C {
    [public x: string]: string
}

//// [indexSignatureWithAccessibilityModifier.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());

//// [indexSignatureWithInitializer.ts]
interface I {
    [x = '']: string;
}

class C {
    [x = 0]: string
}

//// [indexSignatureWithInitializer.js]
var C = (function () {
    function C() {
    }
    return C;
})();

//// [signatureLengthMismatchConstruct.ts]
function takesCallback(fn: new (a: number) => void) {
  // ...
}

class OverlongCtor {
  constructor(a: number, b: number) {}
}

takesCallback(OverlongCtor);


//// [signatureLengthMismatchConstruct.js]
function takesCallback(fn) {
    // ...
}
var OverlongCtor = /** @class */ (function () {
    function OverlongCtor(a, b) {
    }
    return OverlongCtor;
}());
takesCallback(OverlongCtor);

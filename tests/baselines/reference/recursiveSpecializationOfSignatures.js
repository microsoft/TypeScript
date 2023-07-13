//// [tests/cases/compiler/recursiveSpecializationOfSignatures.ts] ////

//// [recursiveSpecializationOfSignatures.ts]
class S0<B, A> {
set S1(S2: S0<any,any>) {
}
constructor(public S17: S0<any, (S18) => A>) { }
}


//// [recursiveSpecializationOfSignatures.js]
var S0 = /** @class */ (function () {
    function S0(S17) {
        this.S17 = S17;
    }
    Object.defineProperty(S0.prototype, "S1", {
        set: function (S2) {
        },
        enumerable: false,
        configurable: true
    });
    return S0;
}());

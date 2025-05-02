//// [tests/cases/conformance/parser/ecmascript5/Protected/Protected9.ts] ////

//// [Protected9.ts]
class C {
   constructor(protected p) { }
}

//// [Protected9.js]
var C = /** @class */ (function () {
    function C(p) {
        this.p = p;
    }
    return C;
}());

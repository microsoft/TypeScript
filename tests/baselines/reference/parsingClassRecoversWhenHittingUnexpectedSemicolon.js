//// [tests/cases/compiler/parsingClassRecoversWhenHittingUnexpectedSemicolon.ts] ////

//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.ts]
class C {
    public f() { };
    private m;
}


//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function () { };
    ;
    return C;
}());

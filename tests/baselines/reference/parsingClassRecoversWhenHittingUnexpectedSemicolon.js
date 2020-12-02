//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.ts]
class C {
    public f() { };
    private m;
}


//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.js]
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype.f = function () { };
    ;
    return C;
}());

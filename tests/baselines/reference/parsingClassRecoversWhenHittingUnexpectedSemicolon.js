//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.ts]
class C {
    public f() { };
    private m;
}


//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.js]
var C = (function () {
    function C() {
    }
    C.prototype.f = function () { };
    ;
    return C;
}());

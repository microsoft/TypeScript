//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.ts]
class C {
    public f() { };
    private m;
}


//// [parsingClassRecoversWhenHittingUnexpectedSemicolon.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.f = function () { };
    ;
    return C;
}());

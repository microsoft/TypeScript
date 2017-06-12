//// [parserErrorRecovery_Block3.ts]
class C  {
    private a(): boolean {

    private b(): boolean {
    }
}

//// [parserErrorRecovery_Block3.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.a = function () {
    };
    proto_1.b = function () {
    };
    return C;
}());

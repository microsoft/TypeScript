//// [parserErrorRecovery_Block3.ts]
class C  {
    private a(): boolean {

    private b(): boolean {
    }
}

//// [parserErrorRecovery_Block3.js]
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    C_prototype.a = function () {
    };
    C_prototype.b = function () {
    };
    return C;
}());

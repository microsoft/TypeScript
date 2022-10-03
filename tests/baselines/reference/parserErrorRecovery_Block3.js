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
    C.prototype.a = function () {
    };
    C.prototype.b = function () {
    };
    return C;
}());

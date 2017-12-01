//// [noUnusedLocals_writeOnlyProperty.ts]
class C {
    private x;
    m() {
        this.x = 0;
    }
}


//// [noUnusedLocals_writeOnlyProperty.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () {
        this.x = 0;
    };
    return C;
}());

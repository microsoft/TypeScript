//// [classStaticBlock7.ts]
class C {
    static {
        await 1;
        yield 1;
        return 1;
    }
}


//// [classStaticBlock7.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());

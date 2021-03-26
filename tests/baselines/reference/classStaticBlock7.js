//// [classStaticBlock7.ts]
class C {
    static {
        await 1;
        yield 1;
        return 1;
    }
}


//// [classStaticBlock7.js]
var _C__;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
_C__ = { value: (function () {
        yield 1;
        yield 1;
        return 1;
    })() };

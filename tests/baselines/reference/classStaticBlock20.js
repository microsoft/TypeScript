//// [classStaticBlock20.ts]
class C {
    async static {
        // something
    }

    public static {
        // something
    }

    readonly private static {
        // something
    }
}


//// [classStaticBlock20.js]
var _C__, _C__1, _C__2;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
_C__ = { value: (function () {
        // something
    })() };
_C__1 = { value: (function () {
        // something
    })() };
_C__2 = { value: (function () {
        // something
    })() };

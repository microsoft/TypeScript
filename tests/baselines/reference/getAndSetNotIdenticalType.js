//// [tests/cases/compiler/getAndSetNotIdenticalType.ts] ////

//// [getAndSetNotIdenticalType.ts]
class C {
    get x(): number {
        return 1;
    }
    set x(v: string) { }
}

//// [getAndSetNotIdenticalType.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());

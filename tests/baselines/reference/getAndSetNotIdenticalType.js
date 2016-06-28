//// [getAndSetNotIdenticalType.ts]
class C {
    get x(): number {
        return 1;
    }
    set x(v: string) { }
}

//// [getAndSetNotIdenticalType.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () {
            return 1;
        },
        set: function (v) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());

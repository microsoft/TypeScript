//// [accessorWithLineTerminator.ts]
class C {
    get
    x() { return 1 }

    set
    x(v) {  }
}

//// [accessorWithLineTerminator.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () { return 1; },
        set: function (v) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());

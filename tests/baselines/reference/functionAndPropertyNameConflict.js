//// [functionAndPropertyNameConflict.ts]
class C65 {
    public aaaaa() { }
    public get aaaaa() {
        return 1;
    }
}

//// [functionAndPropertyNameConflict.js]
var C65 = /** @class */ (function () {
    function C65() {
    }
    C65.prototype.aaaaa = function () { };
    Object.defineProperty(C65.prototype, "aaaaa", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    return C65;
}());

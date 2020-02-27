//// [setterWithReturn.ts]
class C234 {
    public set p1(arg1) {
        if (true) {
            return arg1;
        }
        else {
            return 0;
        }
   }
}

//// [setterWithReturn.js]
var C234 = /** @class */ (function () {
    function C234() {
    }
    Object.defineProperty(C234.prototype, "p1", {
        set: function (arg1) {
            if (true) {
                return arg1;
            }
            else {
                return 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    return C234;
}());

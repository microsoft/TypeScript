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
var C234 = (function () {
    function C234() {
    }
    var proto_1 = C234.prototype;
    Object.defineProperty(proto_1, "p1", {
        set: function (arg1) {
            if (true) {
                return arg1;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    return C234;
}());

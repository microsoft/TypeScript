//// [functionAndPropertyNameConflict.ts]
class C65 {
    public aaaaa() { }
    public get aaaaa() {
        return 1;
    }
}

//// [functionAndPropertyNameConflict.js]
var C65 = (function () {
    function C65() {
    }
    var proto_1 = C65.prototype;
    proto_1.aaaaa = function () { };
    Object.defineProperty(proto_1, "aaaaa", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    return C65;
}());

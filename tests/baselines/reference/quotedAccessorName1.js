//// [quotedAccessorName1.ts]
class C {
    get "foo"() { return 0; }
}

//// [quotedAccessorName1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    Object.defineProperty(proto_1, "foo", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    return C;
}());

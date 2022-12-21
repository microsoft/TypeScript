//// [quotedAccessorName2.ts]
class C {
    static get "foo"() { return 0; }
}

//// [quotedAccessorName2.js]
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C, "foo", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    return C;
}());

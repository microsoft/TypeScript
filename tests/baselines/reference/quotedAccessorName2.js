//// [quotedAccessorName2.ts]
class C {
    static get "foo"() { return 0; }
}

//// [quotedAccessorName2.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C, "foo", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    return C;
}());

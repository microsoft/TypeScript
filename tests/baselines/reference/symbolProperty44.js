//// [symbolProperty44.ts]
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    get [Symbol.hasInstance]() {
        return "";
    }
}

//// [symbolProperty44.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, Symbol.hasInstance, {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

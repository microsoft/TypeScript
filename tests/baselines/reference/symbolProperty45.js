//// [symbolProperty45.ts]
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    get [Symbol.toPrimitive]() {
        return "";
    }
}

//// [symbolProperty45.js]
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
    Object.defineProperty(C.prototype, Symbol.toPrimitive, {
        get: function () {
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

//// [symbolProperty6.ts]
class C {
    [Symbol.iterator] = 0;
    [Symbol.unscopables]: number;
    [Symbol.isRegExp]() { }
    get [Symbol.toStringTag]() {
        return 0;
    }
}

//// [symbolProperty6.js]
var C = (function () {
    function C() {
        this[Symbol.iterator] = 0;
    }
    C.prototype[Symbol.isRegExp] = function () {
    };
    Object.defineProperty(C.prototype, Symbol.toStringTag, {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

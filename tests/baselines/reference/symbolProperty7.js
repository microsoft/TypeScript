//// [symbolProperty7.ts]
class C {
    [Symbol()] = 0;
    [Symbol()]: number;
    [Symbol()]() { }
    get [Symbol()]() {
        return 0;
    }
}

//// [symbolProperty7.js]
var C = (function () {
    function C() {
        this[Symbol()] = 0;
    }
    C.prototype[Symbol()] = function () { };
    Object.defineProperty(C.prototype, Symbol(), {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();

//// [symbolProperty47.ts]
class C {
    get [Symbol.hasInstance]() {
        return "";
    }
    // Should take a string
    set [Symbol.hasInstance](x: number) {
    }
}

(new C)[Symbol.hasInstance] = 0;
(new C)[Symbol.hasInstance] = "";

//// [symbolProperty47.js]
var C = (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, Symbol.hasInstance, {
        get: function () {
            return "";
        },
        // Should take a string
        set: function (x) {
        },
        enumerable: true,
        configurable: true
    });
    return C;
})();
(new C)[Symbol.hasInstance] = 0;
(new C)[Symbol.hasInstance] = "";

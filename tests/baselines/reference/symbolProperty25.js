//// [symbolProperty25.ts]
interface I {
    [Symbol.toPrimitive]: () => boolean;
}

class C implements I {
    [Symbol.toStringTag]() {
        return "";
    }
}

//// [symbolProperty25.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.toStringTag] = function () {
        return "";
    };
    return C;
})();

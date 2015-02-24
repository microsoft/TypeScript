//// [symbolProperty23.ts]
interface I {
    [Symbol.toPrimitive]: () => boolean;
}

class C implements I {
    [Symbol.toPrimitive]() {
        return true;
    }
}

//// [symbolProperty23.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.toPrimitive] = function () {
        return true;
    };
    return C;
})();

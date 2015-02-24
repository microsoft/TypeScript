//// [symbolProperty24.ts]
interface I {
    [Symbol.toPrimitive]: () => boolean;
}

class C implements I {
    [Symbol.toPrimitive]() {
        return "";
    }
}

//// [symbolProperty24.js]
var C = (function () {
    function C() {
    }
    C.prototype[Symbol.toPrimitive] = function () {
        return "";
    };
    return C;
})();

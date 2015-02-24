//// [symbolProperty29.ts]
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
    [s: symbol]: () => { x: string };
}

//// [symbolProperty29.js]
var C1 = (function () {
    function C1() {
    }
    C1.prototype[Symbol.toStringTag] = function () {
        return { x: "" };
    };
    return C1;
})();

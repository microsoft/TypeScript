//// [letUsedInClassMethodOutOfOrder.ts]
class c {
    method1() {
        a; // shouldnt error
    }
}

let a = 10;

//// [letUsedInClassMethodOutOfOrder.js]
var c = (function () {
    function c() {
    }
    c.prototype.method1 = function () {
        a; // shouldnt error
    };
    return c;
})();
var a = 10;

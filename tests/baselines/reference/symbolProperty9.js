//// [symbolProperty9.ts]
class C {
    [Symbol.iterator]: { x; y };
}
interface I {
    [Symbol.iterator]: { x };
}

var i: I;
i = new C;
var c: C = i;

//// [symbolProperty9.js]
var C = (function () {
    function C() {
    }
    return C;
})();
var i;
i = new C;
var c = i;

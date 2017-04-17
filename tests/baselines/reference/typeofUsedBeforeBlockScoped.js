//// [typeofUsedBeforeBlockScoped.ts]
type T = typeof C & typeof C.s & typeof o & typeof o.n;
class C {
    static s = 2;
}
type W = typeof o.n;
let o2: typeof o;
let o = { n: 12 };


//// [typeofUsedBeforeBlockScoped.js]
var C = (function () {
    function C() {
    }
    return C;
}());
C.s = 2;
var o2;
var o = { n: 12 };

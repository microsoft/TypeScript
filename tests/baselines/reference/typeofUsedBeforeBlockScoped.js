//// [typeofUsedBeforeBlockScoped.ts]
type T = typeof C & typeof C.s & typeof o & typeof o.n;
class C {
    static s = 2;
}
type W = typeof o.n;
let o2: typeof o;
let o = { n: 12 };


//// [typeofUsedBeforeBlockScoped.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.s = 2;
    return C;
}());
var o2;
var o = { n: 12 };

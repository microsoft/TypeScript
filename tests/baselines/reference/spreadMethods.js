//// [spreadMethods.ts]
class K { p = 12; m() { } }
interface I { p: number, m(): void }
let k = new K()
let sk = { ...k };
let ssk = { ...k, ...k };
sk.p;
sk.m(); // error
ssk.p;
ssk.m(); // error
let i: I = { p: 12, m() { } };
let si = { ...i };
let ssi = { ...i, ...i };
si.p;
si.m(); // ok
ssi.p;
ssi.m(); // ok
let o = { p: 12, m() { } };
let so = { ...o };
let sso = { ...o, ...o };
so.p;
so.m(); // ok
sso.p;
sso.m(); // ok


//// [spreadMethods.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var K = (function () {
    function K() {
        this.p = 12;
    }
    K.prototype.m = function () { };
    return K;
}());
var k = new K();
var sk = __assign({}, k);
var ssk = __assign({}, k, k);
sk.p;
sk.m(); // error
ssk.p;
ssk.m(); // error
var i = { p: 12, m: function () { } };
var si = __assign({}, i);
var ssi = __assign({}, i, i);
si.p;
si.m(); // ok
ssi.p;
ssi.m(); // ok
var o = { p: 12, m: function () { } };
var so = __assign({}, o);
var sso = __assign({}, o, o);
so.p;
so.m(); // ok
sso.p;
sso.m(); // ok

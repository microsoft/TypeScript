//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS2.ts]
var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { 0: 2 };
}
foo()[0] **= foo()[0];
var result_foo1 = foo()[0] **= foo()[0];
foo()[0] **= foo()[0] **= 2;
var result_foo2 = foo()[0] **= foo()[0] **= 2;
foo()[0] **= foo()[0] ** 2;
var result_foo3 = foo()[0] **= foo()[0] ** 2;

//// [emitCompoundExponentiationAssignmentWithIndexingOnLHS2.js]
var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { 0: 2 };
}
(_a = foo(), _a[0] = Math.pow(_a[0], foo()[0]));
var result_foo1 = (_b = foo(), _b[0] = Math.pow(_b[0], foo()[0]));
(_c = foo(), _c[0] = Math.pow(_c[0], (_d = foo(), _d[0] = Math.pow(_d[0], 2))));
var result_foo2 = (_e = foo(), _e[0] = Math.pow(_e[0], (_f = foo(), _f[0] = Math.pow(_f[0], 2))));
(_g = foo(), _g[0] = Math.pow(_g[0], Math.pow(foo()[0], 2)));
var result_foo3 = (_h = foo(), _h[0] = Math.pow(_h[0], Math.pow(foo()[0], 2)));
var _a, _b, _c, _d, _e, _f, _g, _h;

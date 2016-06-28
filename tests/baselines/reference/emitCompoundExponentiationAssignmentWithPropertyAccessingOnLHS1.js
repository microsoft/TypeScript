//// [emitCompoundExponentiationAssignmentWithPropertyAccessingOnLHS1.ts]

var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { prop: 2 };
}
foo().prop **= 2;
var result0 = foo().prop **= 2;
foo().prop **= foo().prop **= 2;
var result1 = foo().prop **= foo().prop **= 2;
foo().prop **= foo().prop ** 2;
var result2 = foo().prop **= foo().prop ** 2;

//// [emitCompoundExponentiationAssignmentWithPropertyAccessingOnLHS1.js]
var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { prop: 2 };
}
(_a = foo(), _a.prop = Math.pow(_a.prop, 2));
var result0 = (_b = foo(), _b.prop = Math.pow(_b.prop, 2));
(_c = foo(), _c.prop = Math.pow(_c.prop, (_d = foo(), _d.prop = Math.pow(_d.prop, 2))));
var result1 = (_e = foo(), _e.prop = Math.pow(_e.prop, (_f = foo(), _f.prop = Math.pow(_f.prop, 2))));
(_g = foo(), _g.prop = Math.pow(_g.prop, Math.pow(foo().prop, 2)));
var result2 = (_h = foo(), _h.prop = Math.pow(_h.prop, Math.pow(foo().prop, 2)));
var _a, _b, _c, _d, _e, _f, _g, _h;

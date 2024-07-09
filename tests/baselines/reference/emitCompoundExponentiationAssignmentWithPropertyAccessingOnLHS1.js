//// [tests/cases/conformance/es7/exponentiationOperator/emitCompoundExponentiationAssignmentWithPropertyAccessingOnLHS1.ts] ////

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
var _a, _b, _c, _d, _e, _f, _g, _h;
var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { prop: 2 };
}
(_a = foo()).prop = Math.pow(_a.prop, 2);
var result0 = (_b = foo()).prop = Math.pow(_b.prop, 2);
(_d = foo()).prop = Math.pow(_d.prop, (_c = foo()).prop = Math.pow(_c.prop, 2));
var result1 = (_f = foo()).prop = Math.pow(_f.prop, (_e = foo()).prop = Math.pow(_e.prop, 2));
(_g = foo()).prop = Math.pow(_g.prop, Math.pow(foo().prop, 2));
var result2 = (_h = foo()).prop = Math.pow(_h.prop, Math.pow(foo().prop, 2));

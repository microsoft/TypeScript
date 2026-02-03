//// [tests/cases/conformance/expressions/optionalChaining/optionalChainingInLoop.ts] ////

//// [optionalChainingInLoop.ts]
// https://github.com/microsoft/TypeScript/issues/40643
const list: any[] = []
for (const comp of list) {
    comp.sp.y = comp.sp.r.find((k: any) => k.c == (comp.xp ? '1' : '0'))
    for (const item of comp.c) {
        item.v = !!item.t?.length
    }
}

//// [optionalChainingInLoop.js]
var _a;
// https://github.com/microsoft/TypeScript/issues/40643
var list = [];
var _loop_1 = function (comp) {
    comp.sp.y = comp.sp.r.find(function (k) { return k.c == (comp.xp ? '1' : '0'); });
    for (var _b = 0, _c = comp.c; _b < _c.length; _b++) {
        var item = _c[_b];
        item.v = !!((_a = item.t) === null || _a === void 0 ? void 0 : _a.length);
    }
};
for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
    var comp = list_1[_i];
    _loop_1(comp);
}

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
const list = [];
for (const comp of list) {
    comp.sp.y = comp.sp.r.find((k) => k.c == (comp.xp ? '1' : '0'));
    for (const item of comp.c) {
        item.v = !!((_a = item.t) === null || _a === void 0 ? void 0 : _a.length);
    }
}

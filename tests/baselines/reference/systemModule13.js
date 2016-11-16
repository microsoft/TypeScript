//// [systemModule13.ts]

export let [x,y,z] = [1, 2, 3];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}

//// [systemModule13.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __read = (this && this.__read) || function (o, n) {
        if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
        var m, i = m.call(o), ar = [], r, e;
        try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
        catch (error) { e = { error: error }; }
        finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
        return ar;
    };
    var __moduleName = context_1 && context_1.id;
    var x, y, z, z0, z1, _a, _b, _c;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = (_a = [1, 2, 3], _a[0])), exports_1("y", y = _a[1]), exports_1("z", z = _a[2]);
            exports_1("z0", z0 = (_b = { a: true, b: { c: "123" } }, _b.a)), exports_1("z1", z1 = _b.b.c);
            for (var _i = 0, _a = [[1]]; _i < _a.length; _i++) {
                _c = __read(_a[_i], 1), exports_1("x", x = _c[0]);
            }
        }
    };
});

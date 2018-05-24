//// [systemModule13.ts]
export let [x,y,z] = [1, 2, 3];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}

//// [systemModule13.js]
System.register([], function (exports_1, context_1) {
    var _a, _b, x, y, z, z0, z1;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = (_a = [1, 2, 3], _a[0])), exports_1("y", y = _a[1]), exports_1("z", z = _a[2]);
            exports_1("z0", z0 = (_b = { a: true, b: { c: "123" } }, _b.a)), exports_1("z1", z1 = _b.b.c);
            for (var _i = 0, _a = [[1]]; _i < _a.length; _i++) {
                exports_1("x", x = _a[_i][0]);
            }
        }
    };
});

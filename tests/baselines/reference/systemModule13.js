//// [systemModule13.ts]

export let [x,y,z] = [1, 2, 3];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}

//// [systemModule13.js]
System.register([], function(exports_1) {
    "use strict";
    var x, y, z, z0, z1;
    return {
        setters:[],
        execute: function() {
            _a = [1, 2, 3], exports_1("x", x = _a[0]), exports_1("y", y = _a[1]), exports_1("z", z = _a[2]);
            _b = { a: true, b: { c: "123" } }, exports_1("z0", z0 = _b.a), exports_1("z1", z1 = _b.b.c);
            for (var _i = 0, _c = [[1]]; _i < _c.length; _i++) {
                exports_1("x", x = _c[_i][0]);
            }
        }
    }
    var _a, _b;
});

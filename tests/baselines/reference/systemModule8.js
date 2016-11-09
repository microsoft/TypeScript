//// [systemModule8.ts]

export var x;
x = 1;
x++;
x--;
++x;
--x;
x += 1;
x -= 1;
x *= 1;
x /= 1;
x |= 1;
x &= 1;
x + 1;
x - 1;
x & 1;
x | 1;
for (x = 5;;x++) {}
for (x = 8;;x--) {}
for (x = 15;;++x) {}
for (x = 18;;--x) {}

for (let x = 50;;) {}
function foo() {
    x = 100;
}

export let [y] = [1];
export const {a: z0, b: {c: z1}} = {a: true, b: {c: "123"}};
for ([x] of [[1]]) {}

//// [systemModule8.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __read = (this && this.__read) || function (o, n) {
        if (!(m = o.__iterator__)) return o;
        var m, i = m.call(o), ar = [], r, e;
        try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
        catch (error) { e = { error: error }; }
        finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
        return ar;
    };
    var __moduleName = context_1 && context_1.id;
    function foo() {
        exports_1("x", x = 100);
    }
    var x, y, z0, z1, _a, _b;
    return {
        setters: [],
        execute: function () {
            exports_1("x", x = 1);
            exports_1("x", ++x) - 1;
            exports_1("x", --x) + 1;
            exports_1("x", ++x);
            exports_1("x", --x);
            exports_1("x", x += 1);
            exports_1("x", x -= 1);
            exports_1("x", x *= 1);
            exports_1("x", x /= 1);
            exports_1("x", x |= 1);
            exports_1("x", x &= 1);
            x + 1;
            x - 1;
            x & 1;
            x | 1;
            for (exports_1("x", x = 5);; exports_1("x", ++x) - 1) { }
            for (exports_1("x", x = 8);; exports_1("x", --x) + 1) { }
            for (exports_1("x", x = 15);; exports_1("x", ++x)) { }
            for (exports_1("x", x = 18);; exports_1("x", --x)) { }
            for (var x_1 = 50;;) { }
            exports_1("y", y = [1][0]);
            exports_1("z0", z0 = (_a = { a: true, b: { c: "123" } }, _a.a)), exports_1("z1", z1 = _a.b.c);
            for (var _i = 0, _a = [[1]]; _i < _a.length; _i++) {
                _b = __read(_a[_i], 1), exports_1("x", x = _b[0]);
            }
        }
    };
});

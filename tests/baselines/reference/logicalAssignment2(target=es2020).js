//// [logicalAssignment2.ts]
interface A {
    foo: {
        bar(): {
            baz: 0 | 1 | 42 | undefined | ''
        }
        baz: 0 | 1 | 42 | undefined | ''
    }
    baz: 0 | 1 | 42 | undefined | ''
}

declare const result: A
declare const a: A
declare const b: A
declare const c: A

a.baz &&= result.baz
b.baz ||= result.baz
c.baz ??= result.baz

a.foo["baz"] &&= result.foo.baz
b.foo["baz"] ||= result.foo.baz
c.foo["baz"] ??= result.foo.baz

a.foo.bar().baz &&= result.foo.bar().baz
b.foo.bar().baz ||= result.foo.bar().baz
c.foo.bar().baz ??= result.foo.bar().baz



//// [logicalAssignment2.js]
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
(_a = a).baz && (_a.baz = result.baz);
(_b = b).baz || (_b.baz = result.baz);
(_c = c).baz ?? (_c.baz = result.baz);
(_d = a.foo)[_e = "baz"] && (_d[_e] = result.foo.baz);
(_f = b.foo)[_g = "baz"] || (_f[_g] = result.foo.baz);
(_h = c.foo)[_j = "baz"] ?? (_h[_j] = result.foo.baz);
(_k = a.foo.bar()).baz && (_k.baz = result.foo.bar().baz);
(_l = b.foo.bar()).baz || (_l.baz = result.foo.bar().baz);
(_m = c.foo.bar()).baz ?? (_m.baz = result.foo.bar().baz);

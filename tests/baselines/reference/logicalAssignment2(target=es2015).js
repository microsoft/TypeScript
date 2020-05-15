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
b.foo["baz"] &&= result.foo.baz
c.foo["baz"] &&= result.foo.baz

a.foo.bar().baz &&= result.foo.bar().baz
b.foo.bar().baz ||= result.foo.bar().baz
c.foo.bar().baz ??= result.foo.bar().baz



//// [logicalAssignment2.js]
"use strict";
var _a, _b;
var _c, _d, _e, _f, _g, _h, _j, _k, _l;
(_c = a).baz && (_c.baz = result.baz);
(_d = b).baz || (_d.baz = result.baz);
(_a = (_e = c).baz) !== null && _a !== void 0 ? _a : (_e.baz = result.baz);
(_f = a.foo)["baz"] && (_f["baz"] = result.foo.baz);
(_g = b.foo)["baz"] && (_g["baz"] = result.foo.baz);
(_h = c.foo)["baz"] && (_h["baz"] = result.foo.baz);
(_j = a.foo.bar()).baz && (_j.baz = result.foo.bar().baz);
(_k = b.foo.bar()).baz || (_k.baz = result.foo.bar().baz);
(_b = (_l = c.foo.bar()).baz) !== null && _b !== void 0 ? _b : (_l.baz = result.foo.bar().baz);

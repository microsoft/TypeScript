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
var _a, _b, _c;
var _d, _e, _f, _g, _h, _j, _k, _l, _m;
(_d = a).baz && (_d.baz = result.baz);
(_e = b).baz || (_e.baz = result.baz);
(_a = (_f = c).baz) !== null && _a !== void 0 ? _a : (_f.baz = result.baz);
(_g = a.foo)["baz"] && (_g["baz"] = result.foo.baz);
(_h = b.foo)["baz"] || (_h["baz"] = result.foo.baz);
(_b = (_j = c.foo)["baz"]) !== null && _b !== void 0 ? _b : (_j["baz"] = result.foo.baz);
(_k = a.foo.bar()).baz && (_k.baz = result.foo.bar().baz);
(_l = b.foo.bar()).baz || (_l.baz = result.foo.bar().baz);
(_c = (_m = c.foo.bar()).baz) !== null && _c !== void 0 ? _c : (_m.baz = result.foo.bar().baz);

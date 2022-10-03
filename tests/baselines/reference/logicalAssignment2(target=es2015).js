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
var _d, _e, _f, _g, _h, _j;
a.baz && (a.baz = result.baz);
b.baz || (b.baz = result.baz);
(_a = c.baz) !== null && _a !== void 0 ? _a : (c.baz = result.baz);
(_d = a.foo)["baz"] && (_d["baz"] = result.foo.baz);
(_e = b.foo)["baz"] || (_e["baz"] = result.foo.baz);
(_b = (_f = c.foo)["baz"]) !== null && _b !== void 0 ? _b : (_f["baz"] = result.foo.baz);
(_g = a.foo.bar()).baz && (_g.baz = result.foo.bar().baz);
(_h = b.foo.bar()).baz || (_h.baz = result.foo.bar().baz);
(_c = (_j = c.foo.bar()).baz) !== null && _c !== void 0 ? _c : (_j.baz = result.foo.bar().baz);

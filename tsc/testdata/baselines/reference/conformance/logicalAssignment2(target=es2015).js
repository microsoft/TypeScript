//// [tests/cases/conformance/es2021/logicalAssignment/logicalAssignment2.ts] ////

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
a.baz && (a.baz = result.baz);
b.baz || (b.baz = result.baz);
(_a = c.baz) !== null && _a !== void 0 ? _a : (c.baz = result.baz);
(_b = a.foo)["baz"] && (_b["baz"] = result.foo.baz);
(_c = b.foo)["baz"] || (_c["baz"] = result.foo.baz);
(_e = (_d = c.foo)["baz"]) !== null && _e !== void 0 ? _e : (_d["baz"] = result.foo.baz);
(_f = a.foo.bar()).baz && (_f.baz = result.foo.bar().baz);
(_g = b.foo.bar()).baz || (_g.baz = result.foo.bar().baz);
(_j = (_h = c.foo.bar()).baz) !== null && _j !== void 0 ? _j : (_h.baz = result.foo.bar().baz);

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
var _a, _b, _c, _d, _e, _f;
a.baz && (a.baz = result.baz);
b.baz || (b.baz = result.baz);
c.baz ?? (c.baz = result.baz);
(_a = a.foo)["baz"] && (_a["baz"] = result.foo.baz);
(_b = b.foo)["baz"] || (_b["baz"] = result.foo.baz);
(_c = c.foo)["baz"] ?? (_c["baz"] = result.foo.baz);
(_d = a.foo.bar()).baz && (_d.baz = result.foo.bar().baz);
(_e = b.foo.bar()).baz || (_e.baz = result.foo.bar().baz);
(_f = c.foo.bar()).baz ?? (_f.baz = result.foo.bar().baz);

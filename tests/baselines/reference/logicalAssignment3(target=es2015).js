//// [logicalAssignment3.ts]
interface A {
    baz: 0 | 1 | 42 | undefined | ''
}

declare const result: A;
declare const a: A;
declare const b: A;
declare const c: A;

(a.baz) &&= result.baz;
(b.baz) ||= result.baz;
(c.baz) ??= result.baz;



//// [logicalAssignment3.js]
"use strict";
var _a;
var _b, _c, _d;
(_b = a).baz && (_b.baz = result.baz);
(_c = b).baz || (_c.baz = result.baz);
(_a = (_d = c).baz) !== null && _a !== void 0 ? _a : (_d.baz = result.baz);

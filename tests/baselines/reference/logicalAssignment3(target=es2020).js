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
var _a, _b, _c;
(_a = a).baz && (_a.baz = result.baz);
(_b = b).baz || (_b.baz = result.baz);
(_c = c).baz ?? (_c.baz = result.baz);

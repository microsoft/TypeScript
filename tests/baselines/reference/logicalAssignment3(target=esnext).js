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
(a.baz) &&= result.baz;
(b.baz) ||= result.baz;
(c.baz) ??= result.baz;

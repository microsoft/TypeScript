//// [tests/cases/conformance/esnext/logicalAssignment/logicalAssignment11.ts] ////

//// [logicalAssignment11.ts]
let x: string | undefined;

let d: string | undefined;
d ?? (d = x ?? "x")
d.length;

let e: string | undefined;
e ??= x ?? "x"
e.length

//// [logicalAssignment11.js]
"use strict";
let x;
let d;
d ?? (d = x ?? "x");
d.length;
let e;
e ?? (e = x ?? "x");
e.length;

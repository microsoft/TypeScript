//// [tests/cases/conformance/es2021/logicalAssignment/logicalAssignment9.ts] ////

//// [logicalAssignment9.ts]
declare let x: { a?: boolean };

x.a ??= true;
x.a &&= false;


//// [logicalAssignment9.js]
"use strict";
var _a;
(_a = x.a) !== null && _a !== void 0 ? _a : (x.a = true);
x.a && (x.a = false);

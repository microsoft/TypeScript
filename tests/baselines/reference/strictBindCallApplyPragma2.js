//// [tests/cases/conformance/pragma/strictBindCallApply/strictBindCallApplyPragma2.ts] ////

//// [file1.ts]
// @ts-strictBindCallApply
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

//// [file2.ts]
// @ts-strictBindCallApply true
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

//// [file3.ts]
// @ts-strictBindCallApply false
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

//// [file4.ts]
export function f1(x: string) {}
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-strictBindCallApply
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-strictBindCallApply true
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-strictBindCallApply false
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
function f1(x) { }
exports.f1 = f1;
f1.call(undefined, 42); // wrong
f1.call(undefined, "ok"); // right

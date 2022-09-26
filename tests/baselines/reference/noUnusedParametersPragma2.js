//// [tests/cases/conformance/pragma/noUnusedParameters/noUnusedParametersPragma2.ts] ////

//// [file1.ts]
// @ts-noUnusedParameters
export function f1(x: number) {}

//// [file2.ts]
// @ts-noUnusedParameters true
export function f1(x: number) {}

//// [file3.ts]
// @ts-noUnusedParameters false
export function f1(x: number) {}

//// [file4.ts]
export function f1(x: number) {}


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noUnusedParameters
function f1(x) { }
exports.f1 = f1;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noUnusedParameters true
function f1(x) { }
exports.f1 = f1;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
// @ts-noUnusedParameters false
function f1(x) { }
exports.f1 = f1;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.f1 = void 0;
function f1(x) { }
exports.f1 = f1;

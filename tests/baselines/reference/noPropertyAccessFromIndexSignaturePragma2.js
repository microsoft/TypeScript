//// [tests/cases/conformance/pragma/noPropertyAccessFromIndexSignature/noPropertyAccessFromIndexSignaturePragma2.ts] ////

//// [file1.ts]
// @ts-noPropertyAccessFromIndexSignature
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;

//// [file2.ts]
// @ts-noPropertyAccessFromIndexSignature true
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;

//// [file3.ts]
// @ts-noPropertyAccessFromIndexSignature false
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;

//// [file4.ts]
interface A {
    [idx: string]: string;
}
declare var a: A;
export const b = a.something;


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = a.something;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = a.something;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = a.something;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.b = void 0;
exports.b = a.something;

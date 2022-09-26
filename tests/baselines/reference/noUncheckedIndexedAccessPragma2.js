//// [tests/cases/conformance/pragma/noUncheckedIndexedAccess/noUncheckedIndexedAccessPragma2.ts] ////

//// [file1.ts]
// @ts-noUncheckedIndexedAccess
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;

//// [file2.ts]
// @ts-noUncheckedIndexedAccess true
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;

//// [file3.ts]
// @ts-noUncheckedIndexedAccess false
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;

//// [file4.ts]
interface A {
    [index: string]: string;
}
declare var a: A;
export const x: string = a.something;


//// [file1.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = a.something;
//// [file2.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = a.something;
//// [file3.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = a.something;
//// [file4.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = a.something;

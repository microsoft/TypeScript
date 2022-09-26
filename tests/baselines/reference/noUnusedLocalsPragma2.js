//// [tests/cases/conformance/pragma/noUnusedLocals/noUnusedLocalsPragma2.ts] ////

//// [file1.ts]
// @ts-noUnusedLocals
export {};
let x;

//// [file2.ts]
// @ts-noUnusedLocals true
export {};
let x;

//// [file3.ts]
// @ts-noUnusedLocals false
export {};
let x;

//// [file4.ts]
export {};
let x;


//// [file1.js]
"use strict";
exports.__esModule = true;
var x;
//// [file2.js]
"use strict";
exports.__esModule = true;
var x;
//// [file3.js]
"use strict";
exports.__esModule = true;
var x;
//// [file4.js]
"use strict";
exports.__esModule = true;
var x;

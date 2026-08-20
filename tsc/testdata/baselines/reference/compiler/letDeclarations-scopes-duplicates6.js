//// [tests/cases/compiler/letDeclarations-scopes-duplicates6.ts] ////

//// [file1.ts]
var var1 = 0;

//// [file2.ts]
let var1 = 0;

//// [file1.js]
"use strict";
var var1 = 0;
//// [file2.js]
"use strict";
let var1 = 0;

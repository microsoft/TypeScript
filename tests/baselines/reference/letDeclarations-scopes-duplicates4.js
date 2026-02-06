//// [tests/cases/compiler/letDeclarations-scopes-duplicates4.ts] ////

//// [file1.ts]
const var1 = 0;

//// [file2.ts]
let var1 = 0;

//// [file1.js]
"use strict";
const var1 = 0;
//// [file2.js]
"use strict";
let var1 = 0;

//// [tests/cases/compiler/constDeclarations-access.ts] ////

//// [file1.ts]
const x = 0

//// [file2.ts]
x++;

//// [file1.js]
"use strict";
const x = 0;
//// [file2.js]
"use strict";
x++;

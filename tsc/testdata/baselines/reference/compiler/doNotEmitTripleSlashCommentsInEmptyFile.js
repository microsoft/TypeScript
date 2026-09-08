//// [tests/cases/compiler/doNotEmitTripleSlashCommentsInEmptyFile.ts] ////

//// [file0.ts]

//// [file1.ts]

//// [file2.ts]
/// <reference path="file0.ts" />
/// <reference path="file1.ts" />


//// [file0.js]
"use strict";
//// [file1.js]
"use strict";
//// [file2.js]
"use strict";

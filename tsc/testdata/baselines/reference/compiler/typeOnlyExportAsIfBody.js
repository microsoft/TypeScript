//// [tests/cases/compiler/typeOnlyExportAsIfBody.ts] ////

//// [typeOnlyExportAsIfBody.ts]
if (true) export type {};


//// [typeOnlyExportAsIfBody.js]
"use strict";
if (true)
    ;

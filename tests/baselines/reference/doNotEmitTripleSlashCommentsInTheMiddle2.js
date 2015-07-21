//// [tests/cases/compiler/doNotEmitTripleSlashCommentsInTheMiddle2.ts] ////

//// [file0.ts]


//// [file1.ts]

/// <reference path="file0.ts" />
declare var OData: any;
/// <reference path="file0.ts" />

//// [file0.js]
//// [file1.js]
/// <reference path="file0.ts" />

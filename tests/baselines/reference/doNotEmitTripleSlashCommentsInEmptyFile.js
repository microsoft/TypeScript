//// [tests/cases/compiler/doNotEmitTripleSlashCommentsInEmptyFile.ts] ////

//// [file0.ts]

//// [file1.ts]

//// [file2.ts]
/// <reference path="file0.ts" />
/// <reference path="file1.ts" />
/// <amd-dependency path="/js/libs/hgn.js!app/templates/home" name="compiler"/>

//// [file0.js]
//// [file1.js]
//// [file2.js]

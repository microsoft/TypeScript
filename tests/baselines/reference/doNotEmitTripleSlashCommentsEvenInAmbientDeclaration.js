//// [tests/cases/compiler/doNotEmitTripleSlashCommentsEvenInAmbientDeclaration.ts] ////

//// [file0.ts]


//// [file1.ts]

/// <reference path="file0.ts" />
declare var OData: any;

//// [file0.js]
//// [file1.js]

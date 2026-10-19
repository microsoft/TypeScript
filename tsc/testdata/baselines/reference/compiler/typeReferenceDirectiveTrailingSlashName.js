//// [tests/cases/compiler/typeReferenceDirectiveTrailingSlashName.ts] ////

//// [package.d.ts]
declare const fromFile: number;

//// [index.d.ts]
declare const fromDirectory: number;

//// [a.ts]
fromDirectory;
fromFile;


//// [a.js]
"use strict";
fromDirectory;
fromFile;

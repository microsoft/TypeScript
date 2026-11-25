//// [tests/cases/compiler/typeReferenceDirectiveTrailingSlashRelativeName.ts] ////

//// [README.md]
The type root.

//// [.d.ts]
declare const fromFile: number;

//// [index.d.ts]
declare const fromDirectory: number;

//// [a.ts]
/// <reference types="../pkg/" />
fromDirectory;
fromFile;


//// [a.js]
"use strict";
/// <reference types="../pkg/" />
fromDirectory;
fromFile;

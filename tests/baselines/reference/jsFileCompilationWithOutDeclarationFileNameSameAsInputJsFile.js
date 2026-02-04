//// [tests/cases/compiler/jsFileCompilationWithOutDeclarationFileNameSameAsInputJsFile.ts] ////

//// [a.ts]
class c {
}

//// [b.d.ts]
declare function foo(): boolean;


//// [b.js]
"use strict";
class c {
}

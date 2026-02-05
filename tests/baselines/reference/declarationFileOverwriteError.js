//// [tests/cases/compiler/declarationFileOverwriteError.ts] ////

//// [a.d.ts]
declare class c {
}

//// [a.ts]
class d {
}

//// [a.js]
"use strict";
class d {
}

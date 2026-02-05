//// [tests/cases/compiler/uncaughtCompilerError2.ts] ////

//// [uncaughtCompilerError2.ts]
function getObj() {
   ().toString();
}


//// [uncaughtCompilerError2.js]
"use strict";
function getObj() {
    ().toString();
}

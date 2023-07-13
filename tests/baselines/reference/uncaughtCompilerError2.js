//// [tests/cases/compiler/uncaughtCompilerError2.ts] ////

//// [uncaughtCompilerError2.ts]
function getObj() {
   ().toString();
}


//// [uncaughtCompilerError2.js]
function getObj() {
    ().toString();
}

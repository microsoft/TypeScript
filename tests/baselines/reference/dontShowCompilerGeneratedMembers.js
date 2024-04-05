//// [tests/cases/compiler/dontShowCompilerGeneratedMembers.ts] ////

//// [dontShowCompilerGeneratedMembers.ts]
var f: {
    x: number;
    <-
};

//// [dontShowCompilerGeneratedMembers.js]
var f;
-;
;

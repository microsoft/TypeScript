//// [tests/cases/compiler/functionDeclarationWithResolutionOfTypeOfSameName01.ts] ////

//// [functionDeclarationWithResolutionOfTypeOfSameName01.ts]
interface f {
}

function f() {
    <f>f;
}

//// [functionDeclarationWithResolutionOfTypeOfSameName01.js]
"use strict";
function f() {
    f;
}

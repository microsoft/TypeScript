//// [tests/cases/compiler/unusedVariablesinBlocks2.ts] ////

//// [unusedVariablesinBlocks2.ts]
function f1 () {
    let x = 10;
    {
        let x = 11;
    }
}

//// [unusedVariablesinBlocks2.js]
"use strict";
function f1() {
    let x = 10;
    {
        let x = 11;
    }
}

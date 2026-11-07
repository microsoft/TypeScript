//// [tests/cases/compiler/continueTargetSameFunctionLabel.ts] ////

//// [continueTargetSameFunctionLabel.ts]
// Repro for https://github.com/microsoft/TypeScript/issues/30408
// The label is declared in the same function but does not enclose the
// continue statement, so the error should say so instead of claiming the
// jump target crosses a function boundary.
function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        continue loopend;
    }

    loopend:
    console.log('end of loop');
}


//// [continueTargetSameFunctionLabel.js]
"use strict";
// Repro for https://github.com/microsoft/TypeScript/issues/30408
// The label is declared in the same function but does not enclose the
// continue statement, so the error should say so instead of claiming the
// jump target crosses a function boundary.
function foo() {
    for (let i = 0; i < 10; i++) {
        console.log(`${i}`);
        continue loopend;
    }
    loopend: console.log('end of loop');
}

//// [tests/cases/compiler/asyncFunctionNoReturnType.ts] ////

//// [asyncFunctionNoReturnType.ts]
async () => {
    if (window)
        return;
}


//// [asyncFunctionNoReturnType.js]
"use strict";
async () => {
    if (window)
        return;
};

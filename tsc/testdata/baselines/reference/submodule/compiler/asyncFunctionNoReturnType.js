//// [tests/cases/compiler/asyncFunctionNoReturnType.ts] ////

//// [asyncFunctionNoReturnType.ts]
async () => {
    if (window)
        return;
}


//// [asyncFunctionNoReturnType.js]
async () => {
    if (window)
        return;
};

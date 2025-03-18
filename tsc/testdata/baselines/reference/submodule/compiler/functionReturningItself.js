//// [tests/cases/compiler/functionReturningItself.ts] ////

//// [functionReturningItself.ts]
function somefn() {
    return somefn;
}

//// [functionReturningItself.js]
function somefn() {
    return somefn;
}

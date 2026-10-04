//// [tests/cases/compiler/functionReturningItself.ts] ////

//// [functionReturningItself.ts]
function somefn() {
    return somefn;
}

//// [functionReturningItself.js]
"use strict";
function somefn() {
    return somefn;
}


//// [functionReturningItself.d.ts]
declare function somefn(): typeof somefn;

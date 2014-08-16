//// [functionReturningItself.ts]
function somefn() {
    return somefn;
}

//// [functionReturningItself.js]
function somefn() {
    return somefn;
}


//// [functionReturningItself.d.ts]
declare function somefn(): typeof somefn;

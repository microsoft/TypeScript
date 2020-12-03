//// [tests/cases/compiler/jsFileCompilationDuplicateFunctionImplementationFileOrderReversed.ts] ////

//// [a.ts]
function foo() {
    return 30;
}

//// [b.js]
function foo() {
    return 10;
}



//// [out.js]
function foo() {
    return 30;
}
function foo() {
    return 10;
}


//// [out.d.ts]
declare function foo(): number;
declare function foo(): number;

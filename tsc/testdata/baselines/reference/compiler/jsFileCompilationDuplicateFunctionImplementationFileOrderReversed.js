//// [tests/cases/compiler/jsFileCompilationDuplicateFunctionImplementationFileOrderReversed.ts] ////

//// [a.ts]
function foo() {
    return 30;
}

//// [b.js]
function foo() {
    return 10;
}



//// [a.js]
"use strict";
function foo() {
    return 30;
}
//// [b.js]
"use strict";
function foo() {
    return 10;
}


//// [a.d.ts]
//// [b.d.ts]

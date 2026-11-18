//// [tests/cases/compiler/jsFileCompilationDuplicateFunctionImplementation.ts] ////

//// [b.js]
function foo() {
    return 10;
}
//// [a.ts]
function foo() {
    return 30;
}



//// [b.js]
"use strict";
function foo() {
    return 10;
}
//// [a.js]
"use strict";
function foo() {
    return 30;
}


//// [b.d.ts]
declare function foo(): number;
//// [a.d.ts]
declare function foo(): number;

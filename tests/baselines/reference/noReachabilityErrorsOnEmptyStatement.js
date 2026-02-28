//// [tests/cases/compiler/noReachabilityErrorsOnEmptyStatement.ts] ////

//// [noReachabilityErrorsOnEmptyStatement.ts]
function foo() {
    return 1;;
}

//// [noReachabilityErrorsOnEmptyStatement.js]
"use strict";
function foo() {
    return 1;
    ;
}

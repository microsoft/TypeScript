//// [tests/cases/compiler/functionWithNoBestCommonType1.ts] ////

//// [functionWithNoBestCommonType1.ts]
function foo() {
    return true;
    return bar();
}

function bar(): void {
}

//// [functionWithNoBestCommonType1.js]
"use strict";
function foo() {
    return true;
    return bar();
}
function bar() {
}

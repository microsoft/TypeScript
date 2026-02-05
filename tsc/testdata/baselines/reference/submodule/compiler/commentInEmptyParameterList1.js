//// [tests/cases/compiler/commentInEmptyParameterList1.ts] ////

//// [commentInEmptyParameterList1.ts]
function foo(/** nothing */) {
}

//// [commentInEmptyParameterList1.js]
"use strict";
function foo( /** nothing */ /** nothing */) {
}

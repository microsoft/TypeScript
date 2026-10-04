//// [tests/cases/compiler/debugger.ts] ////

//// [debugger.ts]
debugger;

function foo() {
    debugger;

}

//// [debugger.js]
"use strict";
debugger;
function foo() {
    debugger;
}

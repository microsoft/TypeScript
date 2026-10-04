//// [tests/cases/compiler/noSelfOnVars.ts] ////

//// [noSelfOnVars.ts]
function foo() {
    function bar() { }
    var x = bar;
}




//// [noSelfOnVars.js]
"use strict";
function foo() {
    function bar() { }
    var x = bar;
}

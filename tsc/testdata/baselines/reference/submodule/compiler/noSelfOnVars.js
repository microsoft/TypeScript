//// [tests/cases/compiler/noSelfOnVars.ts] ////

//// [noSelfOnVars.ts]
function foo() {
    function bar() { }
    var x = bar;
}




//// [noSelfOnVars.js]
function foo() {
    function bar() { }
    var x = bar;
}

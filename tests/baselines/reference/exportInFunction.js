//// [tests/cases/compiler/exportInFunction.ts] ////

//// [exportInFunction.ts]
function f() {
    export = 0;


//// [exportInFunction.js]
function f() {
    export = 0;
}

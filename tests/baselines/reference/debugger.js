//// [tests/cases/compiler/debugger.ts] ////

//// [debugger.ts]
debugger;

function foo() {
    debugger;

}

//// [debugger.js]
debugger;
function foo() {
    debugger;
}

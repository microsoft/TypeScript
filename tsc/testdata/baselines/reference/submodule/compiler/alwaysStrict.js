//// [tests/cases/compiler/alwaysStrict.ts] ////

//// [alwaysStrict.ts]
function f() {
    var arguments = [];
}

//// [alwaysStrict.js]
function f() {
    var arguments = [];
}

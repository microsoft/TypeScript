//// [tests/cases/compiler/returnStatement1.ts] ////

//// [returnStatement1.ts]
function f() {
    return function (s) {
        var x = s;
    };
    ("harmless extra line");
}

//// [returnStatement1.js]
function f() {
    return function (s) {
        var x = s;
    };
    ("harmless extra line");
}

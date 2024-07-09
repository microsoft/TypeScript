//// [tests/cases/compiler/unusedVariablesinForLoop4.ts] ////

//// [unusedVariablesinForLoop4.ts]
function f1 () {
    for (const elem of ["a", "b", "c"]) {
        elem;
        var x = 20;
    }
}

//// [unusedVariablesinForLoop4.js]
function f1() {
    for (var _i = 0, _a = ["a", "b", "c"]; _i < _a.length; _i++) {
        var elem = _a[_i];
        elem;
        var x = 20;
    }
}

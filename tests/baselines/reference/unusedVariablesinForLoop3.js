//// [unusedVariablesinForLoop3.ts]
function f1 () {
    for (const elem of ["a", "b", "c"]) {

    }
}

//// [unusedVariablesinForLoop3.js]
function f1() {
    for (var _i = 0, _a = ["a", "b", "c"]; _i < _a.length; _i++) {
        var elem = _a[_i];
    }
}

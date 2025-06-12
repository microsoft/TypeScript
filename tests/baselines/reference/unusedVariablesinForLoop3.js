//// [tests/cases/compiler/unusedVariablesinForLoop3.ts] ////

//// [unusedVariablesinForLoop3.ts]
function f1 () {
    for (const elem of ["a", "b", "c"]) {

    }
}

//// [unusedVariablesinForLoop3.js]
function f1() {
    for (const elem of ["a", "b", "c"]) {
    }
}

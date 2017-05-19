//// [unusedVariablesinForLoop2.ts]
function f1 () {
    for (const elem in ["a", "b", "c"]) {

    }
}

//// [unusedVariablesinForLoop2.js]
function f1() {
    for (var elem in ["a", "b", "c"]) {
    }
}

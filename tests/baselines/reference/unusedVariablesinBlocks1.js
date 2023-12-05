//// [tests/cases/compiler/unusedVariablesinBlocks1.ts] ////

//// [unusedVariablesinBlocks1.ts]
function f1 () {
    let x = 10;
    {
        let x = 11;
    }
}

//// [unusedVariablesinBlocks1.js]
function f1() {
    var x = 10;
    {
        var x_1 = 11;
    }
}

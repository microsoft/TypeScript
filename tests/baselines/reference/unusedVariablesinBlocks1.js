//// [unusedVariablesinBlocks1.ts]
function f1 () {
    let x = 10;
    {
        let x = 11;
        x++;
    }
}

//// [unusedVariablesinBlocks1.js]
function f1() {
    var x = 10;
    {
        var x_1 = 11;
        x_1++;
    }
}

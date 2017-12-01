//// [unusedVariablesinBlocks2.ts]
function f1 () {
    let x = 10;
    {
        let x = 11;
    }
    x++;
}

//// [unusedVariablesinBlocks2.js]
function f1() {
    var x = 10;
    {
        var x_1 = 11;
    }
    x++;
}

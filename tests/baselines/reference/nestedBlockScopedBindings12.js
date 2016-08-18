//// [nestedBlockScopedBindings12.ts]
var x;
{
    let x;
    x = 1;
}

var y;
switch (1) {
    case 1:
        let y;
        y = 1;
        break;
}

//// [nestedBlockScopedBindings12.js]
var x;
{
    var x_1;
    x_1 = 1;
}
var y;
switch (1) {
    case 1:
        var y_1;
        y_1 = 1;
        break;
}

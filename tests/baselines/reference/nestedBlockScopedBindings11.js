//// [nestedBlockScopedBindings11.ts]
var x;
{
    let x;
    () => x;
}

var y;
switch (1) {
    case 1:
        let y;
        () => y;
        break;
}

//// [nestedBlockScopedBindings11.js]
var x;
{
    var x_1;
    (function () { return x_1; });
}
var y;
switch (1) {
    case 1:
        var y_1;
        (function () { return y_1; });
        break;
}

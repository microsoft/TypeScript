//// [nestedBlockScopedBindings9.ts]
{
    let x;
    () => x;
}

switch (1) {
    case 1:
        let y;
        () => y;
        break;
}

//// [nestedBlockScopedBindings9.js]
{
    var x_1;
    (function () { return x_1; });
}
switch (1) {
    case 1:
        var y_1;
        (function () { return y_1; });
        break;
}

//// [nestedBlockScopedBindings10.ts]
{
    let x;
    x = 1;
}

switch (1) {
    case 1:
        let y;
        y = 1;
        break;
}

//// [nestedBlockScopedBindings10.js]
{
    var x = void 0;
    x = 1;
}
switch (1) {
    case 1:
        var y = void 0;
        y = 1;
        break;
}

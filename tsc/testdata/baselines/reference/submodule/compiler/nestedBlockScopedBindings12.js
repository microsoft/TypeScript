//// [tests/cases/compiler/nestedBlockScopedBindings12.ts] ////

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

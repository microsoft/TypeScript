//// [tests/cases/compiler/nestedBlockScopedBindings11.ts] ////

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

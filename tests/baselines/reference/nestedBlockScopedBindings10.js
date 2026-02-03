//// [tests/cases/compiler/nestedBlockScopedBindings10.ts] ////

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
    let x;
    x = 1;
}
switch (1) {
    case 1:
        let y;
        y = 1;
        break;
}

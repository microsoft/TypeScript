//// [tests/cases/compiler/nestedBlockScopedBindings9.ts] ////

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
    let x;
    () => x;
}
switch (1) {
    case 1:
        let y;
        () => y;
        break;
}

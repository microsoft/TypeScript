//// [unusedSwitchStatement.ts]
switch (1) {
    case 0:
        let x;
        break;
    case 1:
        const c = 1;
        break;
    default:
        let z = 2;
}


switch (2) {
    case 0:
        let x;
    case 1:
        x++;
}

//// [unusedSwitchStatement.js]
switch (1) {
    case 0:
        var x = void 0;
        break;
    case 1:
        var c = 1;
        break;
    default:
        var z = 2;
}
switch (2) {
    case 0:
        var x = void 0;
    case 1:
        x++;
}

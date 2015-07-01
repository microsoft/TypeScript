//// [parserErrorRecovery_SwitchStatement1.ts]
switch (e) {
    case 1:
       1 + 
    case 2:
       1 + 
    default:
}

//// [parserErrorRecovery_SwitchStatement1.js]
switch (e) {
    case 1:
        1 +
        ;
    case 2:
        1 +
        ;
    default:
}

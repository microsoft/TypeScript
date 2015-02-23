//// [parserErrorRecovery_Block1.ts]
function f() {
    1 + 
    return;
}

//// [parserErrorRecovery_Block1.js]
function f() {
    1 +
    ;
    return;
}

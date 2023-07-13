//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/Blocks/parserErrorRecovery_Block1.ts] ////

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

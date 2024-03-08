//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ArgumentLists/parserErrorRecovery_ArgumentList4.ts] ////

//// [parserErrorRecovery_ArgumentList4.ts]
function foo() {
   bar(a,b
   return;
}

//// [parserErrorRecovery_ArgumentList4.js]
function foo() {
    bar(a, b);
    return;
}

//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ArgumentLists/parserErrorRecovery_ArgumentList3.ts] ////

//// [parserErrorRecovery_ArgumentList3.ts]
function foo() {
   bar(a,
   return;
}

//// [parserErrorRecovery_ArgumentList3.js]
function foo() {
    bar(a);
    return;
}

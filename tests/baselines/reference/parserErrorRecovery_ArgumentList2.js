//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ArgumentLists/parserErrorRecovery_ArgumentList2.ts] ////

//// [parserErrorRecovery_ArgumentList2.ts]
function foo() {
   bar(;
}

//// [parserErrorRecovery_ArgumentList2.js]
function foo() {
    bar();
}

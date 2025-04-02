//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ArgumentLists/parserErrorRecovery_ArgumentList1.ts] ////

//// [parserErrorRecovery_ArgumentList1.ts]
function foo() {
   bar(
   return x;
}

//// [parserErrorRecovery_ArgumentList1.js]
function foo() {
    bar();
    return x;
}

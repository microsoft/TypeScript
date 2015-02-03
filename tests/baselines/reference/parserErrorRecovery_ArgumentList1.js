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

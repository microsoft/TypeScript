//// [parserErrorRecovery_ArgumentList2.ts]
function foo() {
   bar(;
}

//// [parserErrorRecovery_ArgumentList2.js]
function foo() {
    bar();
}

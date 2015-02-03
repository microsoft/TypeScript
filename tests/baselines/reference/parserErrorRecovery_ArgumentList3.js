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

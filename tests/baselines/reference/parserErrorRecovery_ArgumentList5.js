//// [parserErrorRecovery_ArgumentList5.ts]
function foo() {
   bar(a,)
   return;
}

//// [parserErrorRecovery_ArgumentList5.js]
function foo() {
    bar(a);
    return;
}

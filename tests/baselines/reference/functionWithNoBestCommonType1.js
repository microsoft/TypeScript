//// [functionWithNoBestCommonType1.ts]
function foo() {
    return true;
    return bar();
}

function bar(): void {
}

//// [functionWithNoBestCommonType1.js]
function foo() {
    return true;
    return bar();
}
function bar() {
}

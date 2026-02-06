// @target: es2015
// @allowUnreachableCode: true

function foo() {
    return true;
    return bar();
}

function bar(): void {
}
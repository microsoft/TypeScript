// @allowUnreachableCode: true

function foo() {
    return true;
    return bar();
}

function bar(): void {
}
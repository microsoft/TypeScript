// @noImplicitReturns: true
function isMissingReturnExpression(): number {
    return;
}

function isMissingReturnExpression2(): any {
    return;
}

function isMissingReturnExpression3(): number|void {
    return;
}

function isMissingReturnExpression4(): void {
    return;
}

function isMissingReturnExpression5(x) {
    if (x) {
        return 0;
    }
    else {
        return;
    }
}

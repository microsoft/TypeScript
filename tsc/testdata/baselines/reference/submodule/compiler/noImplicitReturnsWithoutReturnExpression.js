//// [tests/cases/compiler/noImplicitReturnsWithoutReturnExpression.ts] ////

//// [noImplicitReturnsWithoutReturnExpression.ts]
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


//// [noImplicitReturnsWithoutReturnExpression.js]
function isMissingReturnExpression() {
    return;
}
function isMissingReturnExpression2() {
    return;
}
function isMissingReturnExpression3() {
    return;
}
function isMissingReturnExpression4() {
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

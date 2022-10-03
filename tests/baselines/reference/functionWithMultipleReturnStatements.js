//// [functionWithMultipleReturnStatements.ts]
// return type of a function with multiple returns is the BCT of each return statement
// it is an error if there is no single BCT, these are error cases

function f1() {
    if (true) {
        return 1;
    } else {
        return '';
    }
}

function f2() {
    if (true) {
        return 1;
    } else if (false) {
        return 2;
    } else {
        return '';
    }
}

function f3() {
    try {
        return 1;
    }
    catch (e) {
        return '';
    }
}

function f4() {
    try {
        return 1;
    }
    catch (e) {

    }
    finally {
        return '';
    }
}

function f5() {
    return 1;
    return '';
}

function f6<T, U>(x: T, y:U) {
    if (true) {
        return x;
    } else {
        return y;
    }
}

function f8<T extends U, U extends V, V>(x: T, y: U) {
    if (true) {
        return x;
    } else {
        return y;
    }
}


//// [functionWithMultipleReturnStatements.js]
// return type of a function with multiple returns is the BCT of each return statement
// it is an error if there is no single BCT, these are error cases
function f1() {
    if (true) {
        return 1;
    }
    else {
        return '';
    }
}
function f2() {
    if (true) {
        return 1;
    }
    else if (false) {
        return 2;
    }
    else {
        return '';
    }
}
function f3() {
    try {
        return 1;
    }
    catch (e) {
        return '';
    }
}
function f4() {
    try {
        return 1;
    }
    catch (e) {
    }
    finally {
        return '';
    }
}
function f5() {
    return 1;
    return '';
}
function f6(x, y) {
    if (true) {
        return x;
    }
    else {
        return y;
    }
}
function f8(x, y) {
    if (true) {
        return x;
    }
    else {
        return y;
    }
}

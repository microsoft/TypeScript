//// [functionWithMultipleReturnStatements2.ts]
// return type of a function with multiple returns is the BCT of each return statement
// no errors expected here

function f1() {
    if (true) {
        return 1;
    } else {
        return null;
    }
}

function f2() {
    if (true) {
        return 1;
    } else if (false) {
        return null;
    } else {
        return 2;
    }
}

function f4() {
    try {
        return 1;
    }
    catch (e) {
        return undefined;
    }
    finally {
        return 1;
    }
}

function f5() {
    return 1;
    return new Object();
}

function f6<T>(x: T) {
    if (true) {
        return x;
    } else {
        return null;
    }
}

//function f7<T extends U, U>(x: T, y: U) {
//    if (true) {
//        return x;
//    } else {
//        return y;
//    }
//}

var a: { x: number; y?: number };
var b: { x: number; z?: number };
// returns typeof a
function f9() {
    if (true) {
        return a;
    } else {
        return b;
    }
}

// returns typeof b
function f10() {
    if (true) {
        return b;
    } else {
        return a;
    }
}

// returns number => void
function f11() {
    if (true) {
        return (x: number) => { }
    } else {
        return (x: Object) => { }
    }
}

// returns Object => void
function f12() {
    if (true) {
        return (x: Object) => { }
    } else {
        return (x: number) => { }        
    }
}

//// [functionWithMultipleReturnStatements2.js]
// return type of a function with multiple returns is the BCT of each return statement
// no errors expected here
function f1() {
    if (true) {
        return 1;
    }
    else {
        return null;
    }
}
function f2() {
    if (true) {
        return 1;
    }
    else if (false) {
        return null;
    }
    else {
        return 2;
    }
}
function f4() {
    try {
        return 1;
    }
    catch (e) {
        return undefined;
    }
    finally {
        return 1;
    }
}
function f5() {
    return 1;
    return new Object();
}
function f6(x) {
    if (true) {
        return x;
    }
    else {
        return null;
    }
}
//function f7<T extends U, U>(x: T, y: U) {
//    if (true) {
//        return x;
//    } else {
//        return y;
//    }
//}
var a;
var b;
// returns typeof a
function f9() {
    if (true) {
        return a;
    }
    else {
        return b;
    }
}
// returns typeof b
function f10() {
    if (true) {
        return b;
    }
    else {
        return a;
    }
}
// returns number => void
function f11() {
    if (true) {
        return function (x) { };
    }
    else {
        return function (x) { };
    }
}
// returns Object => void
function f12() {
    if (true) {
        return function (x) { };
    }
    else {
        return function (x) { };
    }
}

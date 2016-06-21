// @strictNullChecks: true

function f1() {
    let x: never;
    x = 1;
    x = "abc";
    x = false;
    x = undefined;
    x = null;
    x = {};
}

function f2(): never {
    return;
}

function f3(): never {
    return 1;
}

function f4(): never {
}
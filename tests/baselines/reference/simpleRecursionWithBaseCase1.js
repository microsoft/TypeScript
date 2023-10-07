//// [tests/cases/compiler/simpleRecursionWithBaseCase1.ts] ////

//// [simpleRecursionWithBaseCase1.ts]
function fn1(n: number) {
    if (n === 0) {
        return 3;
    } else {
        return fn1(n - 1);
    }
}
const num: number = fn1();

function fn2(n: number) {
    return fn2(n);
}
const nev: never = fn2();

function fn3(n: number) {
    if (n === 0) {
        return 3;
    } else {
        return fn1("hello world");
    }
}

function fn4(n: number) {
    if (n === 0) {
        return 3;
    } else {
        return notfoundsymbol("hello world");
    }
}

function fn5() {
    return [fn5][0]();
}


//// [simpleRecursionWithBaseCase1.js]
"use strict";
function fn1(n) {
    if (n === 0) {
        return 3;
    }
    else {
        return fn1(n - 1);
    }
}
var num = fn1();
function fn2(n) {
    return fn2(n);
}
var nev = fn2();
function fn3(n) {
    if (n === 0) {
        return 3;
    }
    else {
        return fn1("hello world");
    }
}
function fn4(n) {
    if (n === 0) {
        return 3;
    }
    else {
        return notfoundsymbol("hello world");
    }
}
function fn5() {
    return [fn5][0]();
}

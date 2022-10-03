//// [controlFlowArrays.ts]
declare function cond(): boolean;

function f1() {
    let x = [];
    x[0] = 5;
    x[1] = "hello";
    x[2] = true;
    return x;  // (string | number | boolean)[]
}

function f2() {
    let x = [];
    x.push(5);
    x.push("hello");
    x.push(true);
    return x;  // (string | number | boolean)[]
}

function f3() {
    let x;
    x = [];
    x.push(5, "hello");
    return x;  // (string | number)[]
}

function f4() {
    let x = [];
    if (cond()) {
        x.push(5);
    }
    else {
        x.push("hello");
    }
    return x;  // (string | number)[]
}

function f5() {
    let x;
    if (cond()) {
        x = [];
        x.push(5);
    }
    else {
        x = [];
        x.push("hello");
    }
    return x;  // (string | number)[]
}

function f6() {
    let x;
    if (cond()) {
        x = 5;
    }
    else {
        x = [];
        x.push("hello");
    }
    return x;  // number | string[]
}

function f7() {
    let x = null;
    if (cond()) {
        x = [];
        while (cond()) {
            x.push("hello");
        }
    }
    return x;  // string[] | null
}

function f8() {
    let x = [];
    x.push(5);
    if (cond()) return x;  // number[]
    x.push("hello");
    if (cond()) return x;  // (string | number)[]
    x.push(true);
    return x;  // (string | number | boolean)[]
}

function f9() {
    let x = [];
    if (cond()) {
        x.push(5);
        return x;  // number[]
    }
    else {
        x.push("hello");
        return x;  // string[]
    }
}

function f10() {
    let x = [];
    if (cond()) {
        x.push(true);
        x;  // boolean[]
    }
    else {
        x.push(5);
        x;  // number[]
        while (cond()) {
            x.push("hello");
        }
        x;  // (string | number)[]
    }
    x.push(99);
    return x;  // (string | number | boolean)[]
}

function f11() {
    let x = [];
    if (x.length === 0) {  // x.length ok on implicit any[]
        x.push("hello");
    }
    return x;
}

function f12() {
    let x;
    x = [];
    if (x.length === 0) {  // x.length ok on implicit any[]
        x.push("hello");
    }
    return x;
}

function f13() {
    var x = [];
    x.push(5);
    x.push("hello");
    x.push(true);
    return x;  // (string | number | boolean)[]
}

function f14() {
    const x = [];
    x.push(5);
    x.push("hello");
    x.push(true);
    return x;  // (string | number | boolean)[]
}

function f15() {
    let x = [];
    while (cond()) {
        while (cond()) {}
        x.push("hello");
    }
    return x;  // string[]
}

function f16() {
    let x;
    let y;
    (x = [], x).push(5);
    (x.push("hello"), x).push(true);
    ((x))[3] = { a: 1 };
    return x;  // (string | number | boolean | { a: number })[]
}

function f17() {
    let x = [];
    x.unshift(5);
    x.unshift("hello");
    x.unshift(true);
    return x;  // (string | number | boolean)[]
}

function f18() {
    let x = [];
    x.push(5);
    x.unshift("hello");
    x[2] = true;
    return x;  // (string | number | boolean)[]
}

// Repro from #39470

declare function foo(arg: { val: number }[]): void;

let arr = []
arr.push({ val: 1, bar: 2 });
foo(arr);


//// [controlFlowArrays.js]
function f1() {
    var x = [];
    x[0] = 5;
    x[1] = "hello";
    x[2] = true;
    return x; // (string | number | boolean)[]
}
function f2() {
    var x = [];
    x.push(5);
    x.push("hello");
    x.push(true);
    return x; // (string | number | boolean)[]
}
function f3() {
    var x;
    x = [];
    x.push(5, "hello");
    return x; // (string | number)[]
}
function f4() {
    var x = [];
    if (cond()) {
        x.push(5);
    }
    else {
        x.push("hello");
    }
    return x; // (string | number)[]
}
function f5() {
    var x;
    if (cond()) {
        x = [];
        x.push(5);
    }
    else {
        x = [];
        x.push("hello");
    }
    return x; // (string | number)[]
}
function f6() {
    var x;
    if (cond()) {
        x = 5;
    }
    else {
        x = [];
        x.push("hello");
    }
    return x; // number | string[]
}
function f7() {
    var x = null;
    if (cond()) {
        x = [];
        while (cond()) {
            x.push("hello");
        }
    }
    return x; // string[] | null
}
function f8() {
    var x = [];
    x.push(5);
    if (cond())
        return x; // number[]
    x.push("hello");
    if (cond())
        return x; // (string | number)[]
    x.push(true);
    return x; // (string | number | boolean)[]
}
function f9() {
    var x = [];
    if (cond()) {
        x.push(5);
        return x; // number[]
    }
    else {
        x.push("hello");
        return x; // string[]
    }
}
function f10() {
    var x = [];
    if (cond()) {
        x.push(true);
        x; // boolean[]
    }
    else {
        x.push(5);
        x; // number[]
        while (cond()) {
            x.push("hello");
        }
        x; // (string | number)[]
    }
    x.push(99);
    return x; // (string | number | boolean)[]
}
function f11() {
    var x = [];
    if (x.length === 0) { // x.length ok on implicit any[]
        x.push("hello");
    }
    return x;
}
function f12() {
    var x;
    x = [];
    if (x.length === 0) { // x.length ok on implicit any[]
        x.push("hello");
    }
    return x;
}
function f13() {
    var x = [];
    x.push(5);
    x.push("hello");
    x.push(true);
    return x; // (string | number | boolean)[]
}
function f14() {
    var x = [];
    x.push(5);
    x.push("hello");
    x.push(true);
    return x; // (string | number | boolean)[]
}
function f15() {
    var x = [];
    while (cond()) {
        while (cond()) { }
        x.push("hello");
    }
    return x; // string[]
}
function f16() {
    var x;
    var y;
    (x = [], x).push(5);
    (x.push("hello"), x).push(true);
    ((x))[3] = { a: 1 };
    return x; // (string | number | boolean | { a: number })[]
}
function f17() {
    var x = [];
    x.unshift(5);
    x.unshift("hello");
    x.unshift(true);
    return x; // (string | number | boolean)[]
}
function f18() {
    var x = [];
    x.push(5);
    x.unshift("hello");
    x[2] = true;
    return x; // (string | number | boolean)[]
}
var arr = [];
arr.push({ val: 1, bar: 2 });
foo(arr);

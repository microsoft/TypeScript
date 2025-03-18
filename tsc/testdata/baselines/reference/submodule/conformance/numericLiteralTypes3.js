//// [tests/cases/conformance/types/literal/numericLiteralTypes3.ts] ////

//// [numericLiteralTypes3.ts]
type A = 1;
type B = 2 | 3;
type C = 1 | 2 | 3;
type D = 0 | 1 | 2;

function f1(a: A, b: B, c: C, d: D) {
    a = a;
    a = b;
    a = c;
    a = d;
}

function f2(a: A, b: B, c: C, d: D) {
    b = a;
    b = b;
    b = c;
    b = d;
}

function f3(a: A, b: B, c: C, d: D) {
    c = a;
    c = b;
    c = c;
    c = d;
}

function f4(a: A, b: B, c: C, d: D) {
    d = a;
    d = b;
    d = c;
    d = d;
}

function f5(a: A, b: B, c: C, d: D) {
    a = 0;
    a = 1;
    a = 2;
    a = 3;
    b = 0;
    b = 1;
    b = 2;
    b = 3;
    c = 0;
    c = 1;
    c = 2;
    c = 3;
    d = 0;
    d = 1;
    d = 2;
    d = 3;
}

function f6(a: A, b: B, c: C, d: D) {
    a === 0;
    a === 1;
    a === 2;
    a === 3;
    b === 0;
    b === 1;
    b === 2;
    b === 3;
    c === 0;
    c === 1;
    c === 2;
    c === 3;
    d === 0;
    d === 1;
    d === 2;
    d === 3;
}

function f7(a: A, b: B, c: C, d: D) {
    a === a;
    a === b;
    a === c;
    a === d;
    b === a;
    b === b;
    b === c;
    b === d;
    c === a;
    c === b;
    c === c;
    c === d;
    d === a;
    d === b;
    d === c;
    d === d;
}

function f8(x: 0 | 2 | 4) {
    switch (x) {
        case 0: return;
        case 1: return;
        case 2: return;
        case 3: return;
        case 4: return;
        case 5: return;
    }
}

//// [numericLiteralTypes3.js]
function f1(a, b, c, d) {
    a = a;
    a = b;
    a = c;
    a = d;
}
function f2(a, b, c, d) {
    b = a;
    b = b;
    b = c;
    b = d;
}
function f3(a, b, c, d) {
    c = a;
    c = b;
    c = c;
    c = d;
}
function f4(a, b, c, d) {
    d = a;
    d = b;
    d = c;
    d = d;
}
function f5(a, b, c, d) {
    a = 0;
    a = 1;
    a = 2;
    a = 3;
    b = 0;
    b = 1;
    b = 2;
    b = 3;
    c = 0;
    c = 1;
    c = 2;
    c = 3;
    d = 0;
    d = 1;
    d = 2;
    d = 3;
}
function f6(a, b, c, d) {
    a === 0;
    a === 1;
    a === 2;
    a === 3;
    b === 0;
    b === 1;
    b === 2;
    b === 3;
    c === 0;
    c === 1;
    c === 2;
    c === 3;
    d === 0;
    d === 1;
    d === 2;
    d === 3;
}
function f7(a, b, c, d) {
    a === a;
    a === b;
    a === c;
    a === d;
    b === a;
    b === b;
    b === c;
    b === d;
    c === a;
    c === b;
    c === c;
    c === d;
    d === a;
    d === b;
    d === c;
    d === d;
}
function f8(x) {
    switch (x) {
        case 0: return;
        case 1: return;
        case 2: return;
        case 3: return;
        case 4: return;
        case 5: return;
    }
}

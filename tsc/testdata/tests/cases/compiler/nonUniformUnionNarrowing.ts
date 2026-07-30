// @noEmit: true

enum E { A = 1, B = 2 }

function f1(x: E | 1 | 2) {
    if (x === E.A) {
        x;  // 1 | E.A
    }
    else {
        x;  // 2 | E.B
    }
}

function f1s(x: E | 1 | 2) {
    switch (x) {
        case E.A:
            x;  // 1 | E.A
            break;
        default:
            x;  // 2 | E.B
    }
}

function f2(x: E | 1 | 2) {
    if (x === 1) {
        x;  // 1 | E.A
    }
    else {
        x;  // 2 | E.B
    }
}

function f2s(x: E | 1 | 2) {
    switch (x) {
        case 1:
            x;  // 1 | E.A
            break;
        default:
            x;  // 2 | E.B
    }
}

namespace N1 {
    export enum E { A = 1, B = 2 }
}
namespace N2 {
    export enum E { A = 1, B = 2 }
}

function f3(x: N1.E | N2.E) {
    if (x === N1.E.A) {
        x;  // N1.E.A | N2.E.A
    }
    else {
        x;  // N1.E.B | N2.E.B
    }
}

function f3s(x: N1.E | N2.E) {
    switch (x) {
        case N1.E.A:
            x;  // N1.E.A | N2.E.A
            break;
        default:
            x;  // N1.E.B | N2.E.B
    }
}

const sym = Symbol();

function f4(x: symbol | string) {
    if (x === sym) {
        x;  // symbol (not narrowed)
    }
}

function f4s(x: symbol | string) {
    switch (x) {
        case sym:
            x;  // symbol (not narrowed)
    }
}

declare enum EE { A, B }

function f6(x: EE | 1 | 2) {
    if (x === 1) {
        x;  // 1 | EE (computed enum compares to any number)
    }
    else {
        x;  // 2
    }
}

function f6s(x: EE | 1 | 2) {
    switch (x) {
        case 1:
            x;  // 1 | EE (computed enum compares to any number)
            break;
        default:
            x;  // 2
    }
}

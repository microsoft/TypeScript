// @strictNullChecks: true

declare function foo(): string | undefined;

function f1() {
    let x = foo();
    if (x) {
        x; // string
    }
    else {
        x; // string | undefined
    }
}

function f2() {
    let x: string | undefined;
    x = foo();
    if (x) {
        x; // string
    }
    else {
        x; // string | undefined
    }
}

function f3() {
    let x: string | undefined;
    if (x = foo()) {
        x; // string
    }
    else {
        x; // string | undefined
    }
}

function f4() {
    let x: string | undefined;
    if (!(x = foo())) {
        x; // string | undefined
    }
    else {
        x; // string
    }
}

function f5() {
    let x: string | undefined;
    let y: string | undefined;
    if (x = y = foo()) {
        x; // string
        y; // string | undefined
    }
    else {
        x; // string | undefined
        y; // string | undefined
    }
}

function f6() {
    let x: string | undefined;
    let y: string | undefined;
    if (x = foo(), y = foo()) {
        x; // string | undefined
        y; // string
    }
    else {
        x; // string | undefined
        y; // string | undefined
    }
}

function f7(x: {}) {
    if (x) {
        x; // {}
    }
    else {
        x; // {}
    }
}

function f8<T>(x: T) {
    if (x) {
        x; // {}
    }
    else {
        x; // {}
    }
}

function f9<T extends object>(x: T) {
    if (x) {
        x; // {}
    }
    else {
        x; // never
    }
}
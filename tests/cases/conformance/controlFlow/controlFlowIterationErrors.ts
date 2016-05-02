// @noImplicitAny: true

let cond: boolean;

function len(s: string) {
    return s.length;
}

function f1() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x = len(x);
        x;
    }
    x;
}

function f2() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x;
        x = len(x);
    }
    x;
}

declare function foo(x: string): number;
declare function foo(x: number): string;

function g1() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x = foo(x);
        x;
    }
    x;
}

function g2() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x;
        x = foo(x);
    }
    x;
}

function asNumber(x: string | number): number {
    return +x;
}

function h1() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        x = +x + 1;
        x;
    }
}

function h2() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        x = asNumber(x) + 1;
        x;
    }
}

function h3() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        let y = asNumber(x);
        x = y + 1;
        x;
    }
}

function h4() {
    let x: string | number | boolean;
    x = "0";
    while (cond) {
        x;
        let y = asNumber(x);
        x = y + 1;
        x;
    }
}

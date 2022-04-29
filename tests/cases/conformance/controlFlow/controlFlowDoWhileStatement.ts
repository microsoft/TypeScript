let cond: boolean;
function a() {
    let x: string | number;
    x = "";
    do {
        x; // string
    } while (cond)
}
function b() {
    let x: string | number;
    x = "";
    do {
        x; // string
        x = 42;
        break;
    } while (cond)
}
function c() {
    let x: string | number;
    x = "";
    do {
        x; // string
        x = undefined;
        if (typeof x === "string") continue;
        break;
    } while (cond)
}
function d() {
    let x: string | number;
    x = 1000;
    do {
        x; // number
        x = "";
    } while (x = x.length)
    x; // number
}
function e() {
    let x: string | number;
    x = "";
    do {
        x = 42;
    } while (cond)
    x; // number
}
function f() {
    let x: string | number | boolean | RegExp | Function;
    x = "";
    do {
        if (cond) {
            x = 42;
            break;
        }
        if (cond) {
            x = true;
            continue;
        }
        x = /a/;
    } while (cond)
    x; // number | boolean | RegExp
}
function g() {
    let x: string | number | boolean | RegExp | Function;
    x = "";
    do {
        if (cond) {
            x = 42;
            break;
        }
        if (cond) {
            x = true;
            continue;
        }
        x = /a/;
    } while (true)
    x; // number
}

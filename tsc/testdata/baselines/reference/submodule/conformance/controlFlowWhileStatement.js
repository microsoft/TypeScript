//// [tests/cases/conformance/controlFlow/controlFlowWhileStatement.ts] ////

//// [controlFlowWhileStatement.ts]
let cond: boolean;
function a() {
    let x: string | number;
    x = "";
    while (cond) {
        x; // string
    }
}
function b() {
    let x: string | number;
    x = "";
    while (cond) {
        x; // string
        x = 42;
        break;
    }
}
function c() {
    let x: string | number;
    x = "";
    while (cond) {
        x; // string
        x = undefined;
        if (typeof x === "string") continue;
        break;
    }
}
function d() {
    let x: string | number;
    x = "";
    while (x = x.length) {
        x; // number
        x = "";
    }
}
function e() {
    let x: string | number;
    x = "";
    while (cond) {
        x; // string | number
        x = 42;
        x; // number
    }
    x; // string | number
}
function f() {
    let x: string | number | boolean | RegExp | Function;
    x = "";
    while (cond) {
        if (cond) {
            x = 42;
            break;
        }
        if (cond) {
            x = true;
            continue;
        }
        x = /a/;
    }
    x; // string | number | boolean | RegExp
}
function g() {
    let x: string | number | boolean | RegExp | Function;
    x = "";
    while (true) {
        if (cond) {
            x = 42;
            break;
        }
        if (cond) {
            x = true;
            continue;
        }
        x = /a/;
    }
    x; // number
}
function h1() {
    let x: string | number | boolean;
    x = "";
    while (x > 1) {
        x; // string | number
        x = 1;
        x; // number
    }
    x; // string | number
}
declare function len(s: string | number): number;
function h2() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x = len(x);
        x; // number
    }
    x; // string | number
}
function h3() {
    let x: string | number | boolean;
    x = "";
    while (cond) {
        x; // string | number
        x = len(x);
    }
    x; // string | number
}


//// [controlFlowWhileStatement.js]
let cond;
function a() {
    let x;
    x = "";
    while (cond) {
        x;
    }
}
function b() {
    let x;
    x = "";
    while (cond) {
        x;
        x = 42;
        break;
    }
}
function c() {
    let x;
    x = "";
    while (cond) {
        x;
        x = undefined;
        if (typeof x === "string")
            continue;
        break;
    }
}
function d() {
    let x;
    x = "";
    while (x = x.length) {
        x;
        x = "";
    }
}
function e() {
    let x;
    x = "";
    while (cond) {
        x;
        x = 42;
        x;
    }
    x;
}
function f() {
    let x;
    x = "";
    while (cond) {
        if (cond) {
            x = 42;
            break;
        }
        if (cond) {
            x = true;
            continue;
        }
        x = /a/;
    }
    x;
}
function g() {
    let x;
    x = "";
    while (true) {
        if (cond) {
            x = 42;
            break;
        }
        if (cond) {
            x = true;
            continue;
        }
        x = /a/;
    }
    x;
}
function h1() {
    let x;
    x = "";
    while (x > 1) {
        x;
        x = 1;
        x;
    }
    x;
}
function h2() {
    let x;
    x = "";
    while (cond) {
        x = len(x);
        x;
    }
    x;
}
function h3() {
    let x;
    x = "";
    while (cond) {
        x;
        x = len(x);
    }
    x;
}

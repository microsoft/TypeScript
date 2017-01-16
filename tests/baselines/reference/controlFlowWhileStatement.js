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
var cond;
function a() {
    var x;
    x = "";
    while (cond) {
        x; // string
    }
}
function b() {
    var x;
    x = "";
    while (cond) {
        x; // string
        x = 42;
        break;
    }
}
function c() {
    var x;
    x = "";
    while (cond) {
        x; // string
        x = undefined;
        if (typeof x === "string")
            continue;
        break;
    }
}
function d() {
    var x;
    x = "";
    while (x = x.length) {
        x; // number
        x = "";
    }
}
function e() {
    var x;
    x = "";
    while (cond) {
        x; // string | number
        x = 42;
        x; // number
    }
    x; // string | number
}
function f() {
    var x;
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
    var x;
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
    var x;
    x = "";
    while (x > 1) {
        x; // string | number
        x = 1;
        x; // number
    }
    x; // string | number
}
function h2() {
    var x;
    x = "";
    while (cond) {
        x = len(x);
        x; // number
    }
    x; // string | number
}
function h3() {
    var x;
    x = "";
    while (cond) {
        x; // string | number
        x = len(x);
    }
    x; // string | number
}

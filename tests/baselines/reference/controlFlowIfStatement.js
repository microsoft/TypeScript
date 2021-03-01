//// [controlFlowIfStatement.ts]
let x: string | number | boolean | RegExp;
let cond: boolean;

x = /a/;
if (x /* RegExp */, (x = true)) {
    x; // boolean
    x = "";
}
else {
    x; // boolean
    x = 42;
}
x; // string | number

function a() {
    let x: string | number;
    if (cond) {
        x = 42;
    }
    else {
        x = "";
        return;
    }
    x; // number
}
function b() {
    let x: string | number;
    if (cond) {
        x = 42;
        throw "";
    }
    else {
        x = "";
    }
    x; // string
}
function c<T>(data: string | T): T {
    if (typeof data === 'string') {
        return JSON.parse(data);
    }
    else {
        return data;
    }
}
function d<T extends string>(data: string | T): never {
    if (typeof data === 'string') {
        throw new Error('will always happen');
    }
    else {
        return data;
    }
}

interface I<T> {
  p: T;
}
function e(x: I<"A" | "B">) {
    if (x.p === "A") {
        let a: "A" = (null as unknown as typeof x.p)
    }
}


//// [controlFlowIfStatement.js]
var x;
var cond;
x = /a/;
if (x /* RegExp */, (x = true)) {
    x; // boolean
    x = "";
}
else {
    x; // boolean
    x = 42;
}
x; // string | number
function a() {
    var x;
    if (cond) {
        x = 42;
    }
    else {
        x = "";
        return;
    }
    x; // number
}
function b() {
    var x;
    if (cond) {
        x = 42;
        throw "";
    }
    else {
        x = "";
    }
    x; // string
}
function c(data) {
    if (typeof data === 'string') {
        return JSON.parse(data);
    }
    else {
        return data;
    }
}
function d(data) {
    if (typeof data === 'string') {
        throw new Error('will always happen');
    }
    else {
        return data;
    }
}
function e(x) {
    if (x.p === "A") {
        var a_1 = null;
    }
}

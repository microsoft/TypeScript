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

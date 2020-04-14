//// [destructuringControlFlow.ts]
function f1(obj: { a?: string }) {
    if (obj.a) {
        obj = {};
        let a1 = obj["a"];  // string | undefined
        let a2 = obj.a;  // string | undefined
    }
}

function f2(obj: [number, string] | null[]) {
    let a0 = obj[0];  // number | null
    let a1 = obj[1];  // string | null
    let [b0, b1] = obj;
    ([a0, a1] = obj);
    if (obj[0] && obj[1]) {
        let c0 = obj[0];  // number
        let c1 = obj[1];  // string
        let [d0, d1] = obj;
        ([c0, c1] = obj);
    }
}

function f3(obj: { a?: number, b?: string }) {
    if (obj.a && obj.b) {
        let { a, b } = obj;  // number, string
        ({ a, b } = obj);
    }
}

function f4() {
    let x: boolean;
    ({ x } = 0);  // Error
    ({ ["x"]: x } = 0);  // Error
    ({ ["x" + ""]: x } = 0);  // Errpr
}

// Repro from #31770

type KeyValue = [string, string?];
let [key, value]: KeyValue = ["foo"];
value.toUpperCase();  // Error


//// [destructuringControlFlow.js]
"use strict";
function f1(obj) {
    if (obj.a) {
        obj = {};
        var a1 = obj["a"]; // string | undefined
        var a2 = obj.a; // string | undefined
    }
}
function f2(obj) {
    var a0 = obj[0]; // number | null
    var a1 = obj[1]; // string | null
    var b0 = obj[0], b1 = obj[1];
    (a0 = obj[0], a1 = obj[1]);
    if (obj[0] && obj[1]) {
        var c0 = obj[0]; // number
        var c1 = obj[1]; // string
        var d0 = obj[0], d1 = obj[1];
        (c0 = obj[0], c1 = obj[1]);
    }
}
function f3(obj) {
    if (obj.a && obj.b) {
        var a = obj.a, b = obj.b; // number, string
        (a = obj.a, b = obj.b);
    }
}
function f4() {
    var _a, _b;
    var x;
    (x = 0..x); // Error
    (x = 0["x"]); // Error
    (_a = 0, _b = "x" + "", x = _a[_b]); // Errpr
}
var _a = ["foo"], key = _a[0], value = _a[1];
value.toUpperCase(); // Error

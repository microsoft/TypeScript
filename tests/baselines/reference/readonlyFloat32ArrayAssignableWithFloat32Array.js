//// [readonlyFloat32ArrayAssignableWithFloat32Array.ts]
function update(b: Readonly<Float32Array>) {
    const c = copy(b);
    add(c, c);
}

function add(a: Float32Array, b: Float32Array, c: Float32Array = a) {
    c[0] = a[0] + b[0];
}

function copy(a: Float32Array) {
    return new Float32Array(a);
}

//// [readonlyFloat32ArrayAssignableWithFloat32Array.js]
"use strict";
function update(b) {
    var c = copy(b);
    add(c, c);
}
function add(a, b, c) {
    if (c === void 0) { c = a; }
    c[0] = a[0] + b[0];
}
function copy(a) {
    return new Float32Array(a);
}

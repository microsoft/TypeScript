//// [tests/cases/compiler/readonlyFloat32ArrayAssignableWithFloat32Array.ts] ////

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
function update(b) {
    const c = copy(b);
    add(c, c);
}
function add(a, b, c = a) {
    c[0] = a[0] + b[0];
}
function copy(a) {
    return new Float32Array(a);
}
